import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";

import { RexConfig } from "../../config.js";
import {
  IAuthPermission,
  IMutation,
  IMutationAddMediaDownloadArgs,
  IMutationCreateMediaArgs,
  IMutationCreateMediaUploadArgs,
  IMutationDeleteMediaArgs,
  IQuery,
  IQueryMediaItemsArgs,
} from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { RexContext } from "../auth/index.js";
import { ProgressManager, ProgressResolver } from "../progress/index.js";
import { UserManager } from "../user/index.js";
import { MediaManager } from "./media.manager.js";

@resolver()
export class MediaResolver {
  constructor(
    private readonly config: RexConfig,
    private readonly mediaManager: MediaManager,
    private readonly progressManager: ProgressManager,
    private readonly progressResolver: ProgressResolver,
    private readonly userManager: UserManager,
  ) {}

  @resolveQuery()
  async mediaItems(
    root: never,
    { dir }: IQueryMediaItemsArgs,
    context: RexContext,
  ): Promise<IQuery["mediaItems"]> {
    const user = await this.fetchUser(context);
    return this.mediaManager.list(user, dir);
  }

  @resolveMutation()
  async addMediaDownload(
    root: never,
    { url, destinationKey }: IMutationAddMediaDownloadArgs,
    context: RexContext,
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
      }),
    );
    return this.progressResolver.makeGql(progress);
  }

  @resolveMutation()
  async createMedia(
    root: never,
    { key, data }: IMutationCreateMediaArgs,
    context: RexContext,
  ): Promise<IMutation["createMedia"]> {
    const user = await this.fetchUser(context);
    await this.mediaManager.create(user.email, key, data);
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
    const user = await this.fetchUser(context);
    await this.mediaManager.delete(user.email, key);
    return true;
  }

  private async fetchUser(
    context: RexContext,
  ): Promise<Pick<UserModel, "id" | "email">> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.Media))
    ) {
      throw new Error("Forbidden");
    }
    return {
      id: context.userId,
      email: await this.userManager.fetchEmail(context.userId),
    };
  }
}
