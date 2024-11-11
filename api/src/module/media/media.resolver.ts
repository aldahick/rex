import {
  IAuthPermission,
  IMediaItem,
  IMutation,
  IMutationAddMediaDownloadArgs,
  IMutationCreateMediaArgs,
  IMutationCreateMediaUploadArgs,
  IMutationDeleteMediaArgs,
  IProgressStatus,
  IQuery,
  IQueryMediaItemArgs,
} from "@aldahick/rex-sdk";
import {
  resolveField,
  resolveMutation,
  resolveQuery,
  resolver,
} from "@athenajs/core";
import { RexConfig } from "../../config.js";
import { UserModel } from "../../model/index.js";
import { RexContext } from "../auth/auth.context.js";
import { ProgressManager } from "../progress/progress.manager.js";
import { ProgressResolver } from "../progress/progress.resolver.js";
import { MediaManager } from "./media.manager.js";

@resolver()
export class MediaResolver {
  constructor(
    private readonly config: RexConfig,
    private readonly mediaManager: MediaManager,
    private readonly progressManager: ProgressManager,
    private readonly progressResolver: ProgressResolver,
  ) {}

  @resolveQuery()
  async mediaItem(
    root: never,
    { key }: IQueryMediaItemArgs,
    context: RexContext,
  ): Promise<IQuery["mediaItem"]> {
    const { email } = await this.fetchUser(context);
    return this.mediaManager.get(email, key);
  }

  @resolveMutation()
  async addMediaDownload(
    root: never,
    { url, destinationKey, sync }: IMutationAddMediaDownloadArgs,
    context: RexContext,
  ): Promise<IMutation["addMediaDownload"]> {
    const { email } = await this.fetchUser(context);
    const progress = await this.progressManager.create("addMediaDownload");
    if (sync) {
      await this.mediaManager.download({
        email,
        url,
        destinationKey,
      });
      await this.progressManager.updateStatus(
        progress.id,
        IProgressStatus.Complete,
      );
      progress.status = IProgressStatus.Complete;
    } else {
      this.progressManager.resolveSafe(
        progress.id,
        this.mediaManager.download({
          email,
          url,
          destinationKey,
          progressId: progress.id,
        }),
      );
    }
    return this.progressResolver.makeGql(progress);
  }

  @resolveMutation()
  async createMedia(
    root: never,
    { key, data }: IMutationCreateMediaArgs,
    context: RexContext,
  ): Promise<IMutation["createMedia"]> {
    const { email } = await this.fetchUser(context);
    await this.mediaManager.create(email, key, data);
    return true;
  }

  @resolveMutation()
  async createMediaUpload(
    root: never,
    { key }: IMutationCreateMediaUploadArgs,
    context: RexContext,
  ): Promise<IMutation["createMediaUpload"]> {
    // enforce auth
    await this.fetchUser(context);
    key = encodeURIComponent(key);
    return `${this.config.http.url}/v1/media/content?key=${key}`;
  }

  @resolveMutation()
  async deleteMedia(
    root: never,
    { key }: IMutationDeleteMediaArgs,
    context: RexContext,
  ): Promise<IMutation["deleteMedia"]> {
    const { email } = await this.fetchUser(context);
    await this.mediaManager.delete(email, key);
    return true;
  }

  @resolveField("MediaItem.children", true)
  async children(
    parents: IMediaItem[],
    args: never,
    context: RexContext,
  ): Promise<IMediaItem["children"][]> {
    const { email } = await this.fetchUser(context);
    return Promise.all(
      parents.map(({ key }) => this.mediaManager.list(email, key)),
    );
  }

  @resolveField("MediaItem.duration", true)
  async duration(
    items: IMediaItem[],
    args: never,
    context: RexContext,
  ): Promise<IMediaItem["duration"][]> {
    const { email } = await this.fetchUser(context);
    return Promise.all(
      items.map(({ key }) => this.mediaManager.getDuration(email, key)),
    );
  }

  private async fetchUser(
    context: RexContext,
  ): Promise<Pick<UserModel, "id" | "email">> {
    if (
      !(context.userId && (await context.isAuthorized(IAuthPermission.Media)))
    ) {
      throw new Error("Forbidden");
    }
    const user = await context.getUser();
    return {
      id: user.id,
      email: user.email,
    };
  }
}
