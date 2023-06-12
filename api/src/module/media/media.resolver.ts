import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";

import {
  IMutation,
  IMutationAddMediaDownloadArgs,
  IMutationCreateMediaArgs,
  IQuery,
  IQueryMediaItemsArgs,
} from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { AuthContext } from "../auth/index.js";
import { ProgressManager, ProgressResolver } from "../progress/index.js";
import { UserManager } from "../user/index.js";
import { MediaManager } from "./media.manager.js";

@resolver()
export class MediaResolver {
  constructor(
    private readonly mediaManager: MediaManager,
    private readonly progressManager: ProgressManager,
    private readonly progressResolver: ProgressResolver,
    private readonly userManager: UserManager
  ) {}

  @resolveQuery()
  async mediaItems(
    root: never,
    { dir }: IQueryMediaItemsArgs,
    context: AuthContext
  ): Promise<IQuery["mediaItems"]> {
    const user = await this.fetchUser(context);
    return this.mediaManager.list(user, dir);
  }

  @resolveMutation()
  async addMediaDownload(
    root: never,
    { url, destinationKey }: IMutationAddMediaDownloadArgs,
    context: AuthContext
  ): Promise<IMutation["addMediaDownload"]> {
    const user = await this.fetchUser(context);
    const progress = await this.progressManager.create("addMediaDownload");
    this.progressManager.resolveSafe(
      progress.id,
      this.mediaManager.download({
        user,
        url,
        destinationKey,
        progressId: progress.id,
      })
    );
    return this.progressResolver.makeGql(progress);
  }

  @resolveMutation()
  async createMedia(
    root: never,
    { key, data }: IMutationCreateMediaArgs,
    context: AuthContext
  ): Promise<IMutation["createMedia"]> {
    const user = await this.fetchUser(context);
    await this.mediaManager.create({ user, key, data });
    return true;
  }

  private async fetchUser(
    context: AuthContext
  ): Promise<Pick<UserModel, "id" | "email">> {
    if (!context.userId) {
      throw new Error("Forbidden");
    }
    return {
      id: context.userId,
      email: await this.userManager.fetchEmail(context.userId),
    };
  }
}
