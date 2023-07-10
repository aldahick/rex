import {
  controller,
  get,
  HttpRequest,
  HttpResponse,
  post,
} from "@athenajs/core";
import mime from "mime";

import { IAuthPermission } from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { RexContext } from "../auth/index.js";
import { UserManager } from "../user/index.js";
import { MediaManager } from "./media.manager.js";

const HTTP_PARTIAL_CODE = 206;

@controller()
export class MediaController {
  constructor(
    private readonly mediaManager: MediaManager,
    private readonly userManager: UserManager
  ) {}

  @get("/v1/media/content")
  async getContent(
    req: HttpRequest,
    res: HttpResponse,
    context: RexContext
  ): Promise<void> {
    const { key } = req.query as Record<string, string>;
    if (typeof key !== "string") {
      throw new Error("Missing required query parameter `key`");
    }
    const userId = await this.can(context);
    if (!userId) {
      throw new Error("Forbidden");
    }

    const user = { email: await this.userManager.fetchEmail(userId) };
    if (!(await this.mediaManager.isFile(user, key))) {
      throw new Error(`Media "${key}" not found`);
    }

    const { start, end } = await this.sendContentHeaders(req, res, user, key);
    const stream = this.mediaManager.createReadStream(user, key, {
      start,
      end,
    });
    res.send(stream);
  }

  @post("/v1/media/content")
  async uploadContent(
    req: HttpRequest,
    res: HttpResponse,
    context: RexContext
  ): Promise<{ ok: boolean }> {
    const { key } = req.query as Record<string, string>;
    if (typeof key !== "string") {
      throw new Error("Missing required query parameter `key`");
    }
    const userId = await this.can(context);
    if (!userId) {
      throw new Error("Forbidden");
    }

    const user = { email: await this.userManager.fetchEmail(userId) };
    const data = req.body as Buffer;
    console.log(data);
    await this.mediaManager.create({ user, key, data });
    return { ok: true };
  }

  private async sendContentHeaders(
    req: HttpRequest,
    res: HttpResponse,
    user: Pick<UserModel, "email">,
    key: string
  ): Promise<{ start: number; end?: number }> {
    const mimeType = mime.getType(key) ?? "text/plain";
    let start = 0;
    let end: number | undefined;
    if (!mimeType.startsWith("video/") && !mimeType.startsWith("audio/")) {
      return { start, end };
    }

    const size = await this.mediaManager.getSize(user, key);
    if (req.headers.range !== undefined) {
      const tokens = req.headers.range.replace("bytes=", "").split("-");
      if (tokens.length === 2) {
        start = Number(tokens[0]);
        end = Number(tokens[1]);
      }
    }
    if (end === undefined) {
      end = size - 1;
    }
    res.status(HTTP_PARTIAL_CODE).headers({
      "Accept-Range": "bytes",
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Type": mimeType,
    });
    return { start, end };
  }

  /**
   * @returns user ID if authorized
   */
  async can(
    context: RexContext,
    permission = IAuthPermission.Media
  ): Promise<string | undefined> {
    return context.userId && (await context.isAuthorized(permission))
      ? context.userId
      : undefined;
  }
}
