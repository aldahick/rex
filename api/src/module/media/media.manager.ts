import { Dirent, Stats } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { IMediaItem, IMediaItemType, IProgressStatus } from "@aldahick/rex-sdk";
import { Logger, injectable } from "@athenajs/core";
import axios from "axios";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { getVideoDurationInSeconds } from "get-video-duration";
import mime from "mime";
import { filter, isTruthy } from "remeda";
import { RexConfig } from "../../config.js";
import { UserModel } from "../../model/index.js";
import { FileUsageService } from "../../service/file/file-usage.service.js";
import {
  FileService,
  ReadableStreamOptions,
} from "../../service/file/file.service.js";
import { ProgressManager } from "../progress/progress.manager.js";

@injectable()
export class MediaManager {
  constructor(
    private readonly config: RexConfig,
    private readonly fileService: FileService,
    private readonly fileUsageService: FileUsageService,
    private readonly logger: Logger,
    private readonly progressManager: ProgressManager,
  ) {}

  async download({
    email,
    url,
    destinationKey,
    progressId,
  }: {
    email: string;
    url: string;
    destinationKey: string;
    progressId?: string;
  }): Promise<void> {
    const filename = this.resolveKey(email, destinationKey);
    const { data: stream, headers } = await axios.get<Readable>(url, {
      responseType: "stream",
    });
    const totalSize = Number(
      headers["content-length"] ?? headers["Content-Length"],
    );
    let fetchedSize = 0;
    const loggedPercents = [0];
    const onLogError = (err: Error): void => {
      this.logger.error("failed to download media", err, {
        destinationKey,
        progressId,
        url,
        email,
      });
    };
    stream.pause();
    stream.on("data", (chunk: Buffer) => {
      if (Number.isNaN(totalSize)) {
        return;
      }
      const percentComplete = Math.floor((fetchedSize / totalSize) * 100);
      fetchedSize += chunk.byteLength;
      if (
        progressId &&
        percentComplete % 10 === 0 &&
        !loggedPercents.includes(percentComplete)
      ) {
        this.progressManager
          .addLogs(progressId, `${percentComplete}% complete`)
          .catch(onLogError);
        loggedPercents.push(percentComplete);
      }
    });
    stream.pipe(await this.fileService.createWriteStream(filename));
    stream.on("end", () => {
      if (progressId) {
        this.progressManager
          .addLogs(
            progressId,
            `Finished downloading ${url} to ${destinationKey}`,
            IProgressStatus.Complete,
          )
          .catch(onLogError);
      }
    });
    if (progressId) {
      await this.progressManager.addLogs(
        progressId,
        "Started download",
        IProgressStatus.InProgress,
      );
    }
    const completion = new Promise<void>((resolve) =>
      stream.on("end", resolve),
    );
    stream.resume();
    if (!progressId) {
      return completion;
    }
  }

  async create(
    email: string,
    key: string,
    data: string | Readable,
  ): Promise<void> {
    await this.fileService.write(this.resolveKey(email, key), data);
  }

  async delete(email: string, key: string): Promise<void> {
    await this.fileService.delete(this.resolveKey(email, key));
  }

  async list(email: string, key: string): Promise<IMediaItem[]> {
    const dir = this.resolveKey(email, key);
    const entries = (await this.fileService.list(dir)).filter(
      (f) => !f.name.startsWith("."),
    );
    const results = await Promise.all(
      entries.map(async (entry) => {
        let fullKey = path.join(dir, entry.name);
        let localKey = path.join(key, entry.name).replace(/\\/g, "/");
        let stats = entry.isSymbolicLink()
          ? await this.fileService.stat(fullKey)
          : entry;
        if (stats?.isDirectory()) {
          const children = await this.fileService.list(fullKey);
          if (children.length === 1 && children[0]) {
            stats = children[0];
            fullKey += `/${stats.name}`;
            localKey += `/${stats.name}`;
          }
        }
        if (!stats) {
          this.logger.error(`Failed to get stats for key ${fullKey}`);
          return;
        }
        return {
          key: localKey,
          type: await this.getType(stats, fullKey),
        };
      }),
    );
    return filter(results, isTruthy);
  }

  createReadStream(
    email: string,
    key: string,
    options?: ReadableStreamOptions,
  ): Readable {
    return this.fileService.createReadStream(
      this.resolveKey(email, key),
      options,
    );
  }

  async stat(email: string, key: string) {
    return await this.fileService.stat(this.resolveKey(email, key));
  }

  async get(email: string, key: string) {
    const stats = await this.stat(email, key);
    if (!stats) {
      return undefined;
    }
    return {
      key,
      type: await this.getType(stats, this.resolveKey(email, key)),
    };
  }

  /**
   * @returns all emails of users who have media
   */
  async getAllEmails(): Promise<string[]> {
    const entries = await this.fileService.list("");
    return entries.map(({ name }) => name);
  }

  /**
   * @returns undefined for files without a duration (non-video/audio)
   */
  async getDuration(email: string, key: string) {
    const mimeType = mime.getType(path.basename(key));
    const stream = this.fileService.getFilename(this.resolveKey(email, key));
    if (mimeType?.startsWith("audio/")) {
      return Math.floor(await getAudioDurationInSeconds(stream));
    }
    if (mimeType?.startsWith("video/")) {
      return Math.floor(await getVideoDurationInSeconds(stream));
    }
  }

  async getType(stats: Dirent | Stats, key: string): Promise<IMediaItemType> {
    if (!stats.isDirectory()) {
      return IMediaItemType.File;
    }
    const series = await this.fileService.stat(path.join(key, ".series"));
    return series?.isFile() ? IMediaItemType.Series : IMediaItemType.Directory;
  }

  /**
   * @returns the user's remaining media data limit, in bytes
   */
  async getRemainingSpace(email: string): Promise<number> {
    const max = this.config.media.dataLimit;
    if (typeof max !== "number") {
      throw new Error("Cannot upload files: no data limit is configured");
    }
    return max - (await this.fileUsageService.getUsedSpace(email));
  }

  async getUsedSpace(email: string, key: string) {
    return await this.fileUsageService.getUsedSpace(
      this.resolveKey(email, key),
    );
  }

  resolveKey(user: UserModel | string, key: string) {
    const email = typeof user === "string" ? user : user.email;
    return path.join(email, key);
  }
}
