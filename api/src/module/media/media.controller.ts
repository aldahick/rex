import {
  controller,
  get,
  HttpRequest,
  HttpResponse,
  post,
} from "@athenajs/core";
import mime from "mime";

import { IAuthPermission } from "../../graphql.js";
import { RexContext } from "../auth/index.js";
import { UserManager } from "../user/index.js";
import { MediaManager, MediaStats } from "./media.manager.js";

const HTTP_SUCCESS = 200;
const HTTP_PARTIAL = 206;

@controller()
export class MediaController {
  constructor(
    private readonly mediaManager: MediaManager,
    private readonly userManager: UserManager,
  ) {}

  @get("/v1/media/content")
  async getContent(
    req: HttpRequest,
    res: HttpResponse,
    context: RexContext,
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
    const stats = await this.mediaManager.stat(user, key);
    if (!stats?.isFile()) {
      throw new Error(`Media "${key}" not found`);
    }

    const { start, end } = await this.sendContentHeaders(req, res, key, stats);
    const stream = this.mediaManager.createReadStream(user, key, {
      start,
      end,
    });
    return res.send(stream);
  }

  @post("/v1/media/content")
  async uploadContent(
    req: HttpRequest,
    res: HttpResponse,
    context: RexContext,
  ): Promise<{ ok: boolean }> {
    const { key } = req.query as Record<string, string>;
    if (typeof key !== "string") {
      throw new Error("Missing required query parameter `key`");
    }
    const userId = await this.can(context);
    if (!userId) {
      throw new Error("Forbidden");
    }
    const email = await this.userManager.fetchEmail(userId);
    const fileSize = await this.mediaManager.getRemainingSpace({ email });
    const data = await req.file({ limits: { fileSize } });
    if (!data) {
      throw new Error("Missing a multipart file");
    }

    await this.mediaManager.create(email, key, data.file);
    return { ok: true };
  }

  private async sendContentHeaders(
    req: HttpRequest,
    res: HttpResponse,
    key: string,
    stats: MediaStats,
  ): Promise<{ start: number; end?: number }> {
    const mimeType = mime.getType(key) ?? "text/plain";
    let start = 0;
    let end: number | undefined;
    if (!mimeType.startsWith("video/") && !mimeType.startsWith("audio/")) {
      return { start, end };
    }

    if (req.headers.range !== undefined) {
      const tokens = req.headers.range.replace("bytes=", "").split("-");
      if (tokens.length === 2) {
        start = Number(tokens[0]);
        end = Number(tokens[1]);
      }
    }
    const size = stats.size;
    const status = end && end > size ? HTTP_PARTIAL : HTTP_SUCCESS;
    if (end === undefined) {
      end = size - 1;
    }
    const headers = {
      "Accept-Range": "bytes",
      "Content-Length": (end - start + 1).toString(),
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Type": mimeType,
    };
    res.status(status).headers(headers);
    return { start, end };
  }

  /**
   * @returns user ID if authorized
   */
  async can(
    context: RexContext,
    permission = IAuthPermission.Media,
  ): Promise<string | undefined> {
    return context.userId && (await context.isAuthorized(permission))
      ? context.userId
      : undefined;
  }
}
