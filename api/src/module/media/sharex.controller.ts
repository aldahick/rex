import { randomBytes } from "crypto";
import path from "path";
import {
  HttpMethod,
  HttpRequest,
  HttpResponse,
  controller,
  get,
  httpRoute,
  post,
} from "@athenajs/core";
import mime from "mime";
import { RexConfig } from "../../config.js";
import { IAuthPermission } from "../../graphql.js";
import { AuthManager, RexContext } from "../auth/index.js";
import { UserManager } from "../user/user.manager.js";
import { MediaController } from "./media.controller.js";
import { MediaManager } from "./media.manager.js";

type UploadResponse =
  | {
      resource: string;
      thumbnail?: string;
      /** deletion URL */
      delete: string;
    }
  | {
      error: string;
    };

const KEY_DIR = ".sharex";

@controller()
export class SharexController {
  constructor(
    private readonly authManager: AuthManager,
    private readonly config: RexConfig,
    private readonly mediaController: MediaController,
    private readonly mediaManager: MediaManager,
    private readonly userManager: UserManager,
  ) {}

  @post("/v1/sharex/upload")
  async upload(
    req: HttpRequest,
    res: HttpResponse,
    context: RexContext,
  ): Promise<UploadResponse> {
    const { userId } = context;
    if (!userId || !(await context.isAuthorized(IAuthPermission.Media))) {
      res.status(403);
      return {
        error: "Unauthorized",
      };
    }
    const email = await this.userManager.fetchEmail(userId);
    const file = await req.file();
    if (!file) {
      res.status(400);
      return {
        error: "No file uploaded",
      };
    }
    const extension = mime.getExtension(file?.mimetype);
    const filename = `${this.createId()}.${extension}`;
    const key = this.getKey(filename);
    await this.mediaManager.create(email, key, file.file);
    const resource = `${this.config.media.sharexUrl}/${filename}`;
    const token = this.authManager.signToken(userId);
    const deleteUrl = `${resource}/delete?token=${token}`;
    return {
      resource,
      delete: deleteUrl,
    };
  }

  @get("/v1/sharex/:filename")
  async get(req: HttpRequest, res: HttpResponse) {
    const { filename } = req.params as { filename: string };
    const key = this.getKey(filename);
    for (const email of await this.mediaManager.getAllEmails()) {
      const stats = await this.mediaManager.stat({ email }, key);
      if (stats) {
        const content = this.mediaController.getContentDetails(req, key, stats);
        const stream = this.mediaManager.createReadStream({ email }, key);
        return res.status(content.status).headers(content.headers).send(stream);
      }
    }
    return res.status(404).send("Not found");
  }

  @httpRoute(HttpMethod.GET, "/v1/sharex/:filename/delete")
  async delete(req: HttpRequest, res: HttpResponse, context: RexContext) {
    const { userId } = context;
    if (!userId || !(await context.isAuthorized(IAuthPermission.Media))) {
      return res.status(403).send("Unauthorized");
    }
    const email = await this.userManager.fetchEmail(userId);
    const { filename } = req.params as { filename: string };
    const key = this.getKey(filename);
    await this.mediaManager.delete(email, key);
    return "Deleted";
  }

  private createId(): string {
    return randomBytes(8).toString("base64").replace(/\=.*$/, "");
  }

  private getKey(filename: string): string {
    return path.join(KEY_DIR, filename);
  }
}
