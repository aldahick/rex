import { controller, get, HttpRequest, HttpResponse } from "@athenajs/core";
import mime from "mime";

import { IAuthPermission } from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { AuthContext } from "../auth/index.js";
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
  async handle(
    req: HttpRequest,
    res: HttpResponse,
    context: AuthContext
  ): Promise<void> {
    if (!(await context.isAuthorized(IAuthPermission.ManageMediaSelf))) {
      throw new Error("Forbidden");
    }
    // const { req, res, context } = payload;
    const { key } = req.query as Record<string, string>;
    if (typeof key !== "string") {
      throw new Error("Missing required query parameter `key`");
    }

    if (!context.userId) {
      throw new Error("Requires user token");
    }
    const user = { email: await this.userManager.fetchEmail(context.userId) };
    const isFile = await this.mediaManager.exists(user, key);
    if (!isFile) {
      throw new Error(`Media "${key}" not found`);
    }

    const { start, end } = await this.sendHeaders(req, res, user, key);
    const stream = this.mediaManager.createReadStream(user, key, {
      start,
      end,
    });
    res.send(stream);
  }

  private async sendHeaders(
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
}
