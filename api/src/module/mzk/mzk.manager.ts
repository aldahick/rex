import { injectable } from "@athenajs/core";
import { spawn } from "child_process";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

import { RexConfig } from "../../config.js";
import { ITranscriptionStatus } from "../../graphql.js";
import { TranscriptionModel, UserModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database.service.js";
import { DockerService } from "../../service/docker.service.js";
import { GoogleCloudService } from "../../service/googleCloud.service.js";
import { AuthManager } from "../auth/auth.manager.js";
import { MediaManager } from "../media/media.manager.js";

@injectable()
export class MzkManager {
  constructor(
    private readonly authManager: AuthManager,
    private readonly config: RexConfig,
    private readonly db: DatabaseService,
    private readonly docker: DockerService,
    private readonly googleCloud: GoogleCloudService,
    private readonly mediaManager: MediaManager,
  ) {}

  async fetchMany(userId: string): Promise<TranscriptionModel[]> {
    return this.db.transcriptions.where({ userId }).selectAll();
  }

  async fetchOne(id: string): Promise<TranscriptionModel> {
    return this.db.transcriptions.findBy({ id });
  }

  async create(
    userId: string,
    inputKey: string,
    filename: string,
  ): Promise<TranscriptionModel> {
    return this.db.transcriptions.create({
      userId,
      filename,
      inputKey,
      outputKey: inputKey.replace(/\.[^\.]+$/, ".pdf"),
      status: ITranscriptionStatus.Created,
    });
  }

  async start(
    transcription: TranscriptionModel,
    user: Pick<UserModel, "email">,
  ): Promise<void> {
    const {
      http: { url },
      mzk: {
        runner: { dir, image, platform },
      },
    } = this.config;
    const token = this.authManager.signToken(transcription.userId);
    const args = [url, token, transcription.inputKey] as [string, ...string[]];
    const hostPath = this.mediaManager.toFilename(
      user,
      transcription.outputKey,
    );
    if (platform === "docker") {
      const containerPath = "/output";
      args.push(`file://${containerPath}`);
      args[0] = args[0].replace("://localhost:", "://host.docker.internal:");
      await fs.writeFile(hostPath, "");
      await this.docker.run({
        image,
        args,
        volumePaths: [
          {
            container: containerPath,
            host: hostPath,
          },
        ],
      });
    } else if (platform === "gcp") {
      args.push(`rex://${transcription.outputKey}`);
      const name = `${transcription.userId}:${transcription.outputKey}`;
      await this.googleCloud.createAndRun({
        image,
        name: "mzk-" + createHash("md5").update(name).digest("hex"),
        args,
      });
    } else if (platform === "spawn" && dir) {
      args.push(`file://${hostPath}`);
      const scriptPath = path.resolve(process.cwd(), dir, "main.py");
      args.splice(0, 0, scriptPath);
      console.log(args);
      const python = spawn("python3", args);
      await new Promise<void>((resolve, reject) => {
        python.stdout.on("data", (chunk) => console.log(chunk.toString()));
        python.stderr.on("data", (chunk) => console.error(chunk.toString()));
        python.on("error", reject);
        python.on("close", (code) => {
          if (code !== 0) {
            reject(`Omnizart failed to execute with code ${code}`);
          } else {
            resolve();
          }
        });
      });
    } else {
      throw new Error(
        `Unrecognized or misconfigured Mzk platform set: ${platform}`,
      );
    }
  }
}
