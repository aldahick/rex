import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { injectable } from "@athenajs/core";
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
    return await this.db.transcriptions.where({ userId }).selectAll();
  }

  async fetchOne(id: string): Promise<TranscriptionModel> {
    return await this.db.transcriptions.findBy({ id });
  }

  async create(
    userId: string,
    inputKey: string,
    filename: string,
  ): Promise<TranscriptionModel> {
    return await this.db.transcriptions.create({
      userId,
      filename,
      inputKey,
      outputKey: inputKey.replace(/\.[^\.]+$/, ".pdf"),
      status: ITranscriptionStatus.Created,
    });
  }

  async updateStatus(
    transcription: TranscriptionModel,
    status: ITranscriptionStatus,
  ): Promise<void> {
    await this.db.transcriptions.where({ id: transcription.id }).update({
      status,
    });
  }

  async start(
    transcription: TranscriptionModel,
    user: Pick<UserModel, "email">,
  ): Promise<void> {
    const { http, mzk } = this.config;
    const token = this.authManager.signToken(transcription.userId);
    const inputParams = new URLSearchParams({
      key: transcription.inputKey,
      token,
    });
    const audioUrl = `${http.url}/v1/media/content?${inputParams.toString()}`;
    const outputParams = new URLSearchParams({
      key: transcription.outputKey,
      token,
    });
    const outputUrl = `${http.url}/v1/media/content?${outputParams.toString()}`;
    const outputPath = this.mediaManager.toFilename(
      user,
      transcription.outputKey,
    );
    await this.updateStatus(transcription, ITranscriptionStatus.Started);
    switch (mzk.runner.platform) {
      case "docker":
        return await this.startDocker(transcription, audioUrl, outputPath);
      case "spawn":
        return await this.startSpawn(transcription, audioUrl, outputPath);
      case "gcp":
        return await this.startGoogleCloud(transcription, audioUrl, outputUrl);
      default:
        throw new Error(
          `Unrecognized or misconfigured Mzk platform set: ${mzk.runner.platform}`,
        );
    }
  }

  async startDocker(
    transcription: TranscriptionModel,
    audioUrl: string,
    hostOutputPath: string,
  ) {
    const { image } = this.config.mzk.runner;
    if (!image) {
      throw new Error(
        "Missing MZK_RUNNER_IMAGE with MZK_RUNNER_PLATFORM=docker",
      );
    }
    const containerOutputPath = "/output";
    const args = [
      "--audio-url",
      audioUrl.replace("://localhost:", "://host.docker.internal:"),
      "--output-path",
      containerOutputPath,
    ];
    await fs.writeFile(hostOutputPath, Buffer.alloc(0));
    this.docker
      .run({
        image,
        args,
        volumePaths: [
          {
            container: containerOutputPath,
            host: hostOutputPath,
          },
        ],
      })
      .then(() => {
        void this.updateStatus(transcription, ITranscriptionStatus.Complete);
      })
      .catch((err) => {
        console.error(err);
        void this.updateStatus(transcription, ITranscriptionStatus.Errored);
      });
  }

  async startGoogleCloud(
    transcription: TranscriptionModel,
    audioUrl: string,
    outputUrl: string,
  ) {
    const { image } = this.config.mzk.runner;
    if (!image) {
      throw new Error(
        "Missing MZK_RUNNER_IMAGE with MZK_RUNNER_PLATFORM=docker",
      );
    }
    const args = ["--audio-url", audioUrl, "--output-url", outputUrl];
    args.push(`rex://${transcription.outputKey}`);
    const name = `${transcription.userId}:${transcription.outputKey}`;
    await this.googleCloud.createAndRun({
      image,
      name: `mzk-${createHash("md5").update(name).digest("hex")}`,
      args,
    });
  }

  async startSpawn(
    transcription: TranscriptionModel,
    audioUrl: string,
    outputPath: string,
  ) {
    const { dir } = this.config.mzk.runner;
    if (!dir) {
      throw new Error("Missing MZK_RUNNER_DIR with MKZ_RUNNER_PLATFORM=spawn");
    }
    const scriptPath = path.resolve(process.cwd(), dir, "main.py");
    const args = [
      scriptPath,
      "--audio-url",
      audioUrl,
      "--output-path",
      outputPath,
    ];
    const python = spawn("python3", args);
    python.stdout.on("data", (chunk) => console.log(chunk.toString()));
    python.stderr.on("data", (chunk) => console.error(chunk.toString()));
    python.on("error", (err) => {
      console.error(err);
      void this.updateStatus(transcription, ITranscriptionStatus.Errored);
    });
    python.on("close", (code) => {
      if (code !== 0) {
        console.error(
          new Error(`Omnizart failed to execute with code ${code}`),
        );
        void this.updateStatus(transcription, ITranscriptionStatus.Errored);
      } else {
        void this.updateStatus(transcription, ITranscriptionStatus.Complete);
      }
    });
  }
}
