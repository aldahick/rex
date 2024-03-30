import {
  HttpRequest,
  HttpResponse,
  controller,
  get,
  post,
} from "@athenajs/core";
import mime from "mime";

import { IAuthPermission } from "../../graphql.js";
import { RexContext } from "../auth/index.js";
import { UserManager } from "../user/index.js";
import { MediaManager, MediaStats } from "./media.manager.js";

const HTTP_SUCCESS = 200;
const HTTP_PARTIAL = 206;
const CONTENT_LENGTH = 10 * 1024 ** 2; // 10mb

interface ContentDetails {
  headers: Record<string, string>;
  status: number;
  range: {
    start: number;
    end: number;
  };
}

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
  ): Promise<HttpResponse> {
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

    const content = this.getContentDetails(req, key, stats);
    const stream = this.mediaManager.createReadStream(user, key, content.range);
    return res.status(content.status).headers(content.headers).send(stream);
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

  getContentDetails(
    req: HttpRequest,
    key: string,
    { size }: MediaStats,
  ): ContentDetails {
    const mimeType = mime.getType(key) ?? "text/plain";
    const { start, end } = this.getRange(req, size);
    const headers = {
      "Accept-Range": "bytes",
      "Content-Length": (end - start + 1).toString(),
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Type": mimeType,
    };
    const status = end < size ? HTTP_PARTIAL : HTTP_SUCCESS;
    return {
      headers,
      status,
      range: { start, end },
    };
  }

  private getRange(req: HttpRequest, size: number): ContentDetails["range"] {
    const tokens = req.headers.range?.slice("bytes=".length).split("-") ?? [];
    let start = Number(tokens[0]);
    let end = tokens[1] ? Number(tokens[1]) : Number.NaN;
    if (Number.isNaN(start)) {
      start = 0;
    }
    if (Number.isNaN(end)) {
      // Content-Range is zero-indexed, so without -1 browsers will expect one more byte than we have
      end = Math.min(size - 1, start + CONTENT_LENGTH);
    }
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
