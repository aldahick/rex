import { injectable } from "@athenajs/core";
import { createHash } from "crypto";

import { RexConfig } from "../../config.js";
import { ITranscriptionStatus } from "../../graphql.js";
import { TranscriptionModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database.service.js";
import { DockerService } from "../../service/docker.service.js";
import { GoogleCloudService } from "../../service/googleCloud.service.js";
import { AuthManager } from "../auth/auth.manager.js";

@injectable()
export class MzkManager {
  constructor(
    private readonly authManager: AuthManager,
    private readonly config: RexConfig,
    private readonly db: DatabaseService,
    private readonly docker: DockerService,
    private readonly googleCloud: GoogleCloudService,
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

  async start(transcription: TranscriptionModel): Promise<void> {
    const {
      http: { url },
      mzk: {
        runner: { image, platform },
      },
    } = this.config;
    const token = this.authManager.signToken(transcription.userId);
    const args = [
      url.replace("://localhost:", "://host.docker.internal:"),
      token,
      transcription.inputKey,
      transcription.outputKey,
    ];
    if (platform === "docker") {
      await this.docker.run(image, args);
    } else if (platform === "gcp") {
      const name = `${transcription.userId}:${transcription.outputKey}`;
      await this.googleCloud.createAndRun({
        image,
        name: "mzk-" + createHash("md5").update(name).digest("hex"),
        args,
      });
    }
  }
}
