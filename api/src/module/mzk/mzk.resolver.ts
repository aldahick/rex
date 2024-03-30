import path from "node:path";
import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";

import {
  IAuthPermission,
  IMediaItemType,
  IMutation,
  IMutationStartTranscriptionArgs,
  IQuery,
  ITranscription,
} from "../../graphql.js";
import { TranscriptionModel } from "../../model/index.js";
import { RexContext } from "../auth/auth.context.js";
import { UserManager } from "../user/user.manager.js";
import { MzkManager } from "./mzk.manager.js";

@resolver()
export class MzkResolver {
  constructor(
    private readonly mzkManager: MzkManager,
    private readonly userManager: UserManager,
  ) {}

  @resolveMutation()
  async startTranscription(
    root: never,
    { mediaKey }: IMutationStartTranscriptionArgs,
    context: RexContext,
  ): Promise<IMutation["startTranscription"]> {
    const userId = await this.can(context);
    if (!userId) {
      throw new Error("Starting transcriptions requires authorization");
    }
    const filename = path.parse(mediaKey).name;
    const transcription = await this.mzkManager.create(
      userId,
      mediaKey,
      filename,
    );
    const email = await this.userManager.fetchEmail(userId);
    await this.mzkManager.start(transcription, { email });
    return this.makeGql(await this.mzkManager.fetchOne(transcription.id));
  }

  @resolveQuery()
  async transcriptions(
    root: never,
    args: never,
    context: RexContext,
  ): Promise<IQuery["transcriptions"]> {
    const userId = await this.can(context);
    if (!userId) {
      throw new Error("Viewing transcriptions requires authorization");
    }
    const transcriptions = await this.mzkManager.fetchMany(userId);
    return transcriptions.map((t) => this.makeGql(t));
  }

  makeGql(transcription: TranscriptionModel): ITranscription {
    return {
      id: transcription.id,
      status: transcription.status,
      filename: transcription.filename,
      pdf: transcription.outputKey
        ? {
            key: transcription.outputKey,
            type: IMediaItemType.File,
          }
        : undefined,
    };
  }

  /** @returns user ID if authorized to do transcription things */
  async can(context: RexContext): Promise<string | undefined> {
    const can =
      context.userId &&
      (await context.isAuthorized(IAuthPermission.Transcriptions))
        ? context.userId
        : undefined;
    return can;
  }
}
