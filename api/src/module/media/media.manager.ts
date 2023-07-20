import { injectable, Logger } from "@athenajs/core";
import axios from "axios";
import { createReadStream, createWriteStream, promises as fs } from "fs";
import path from "path";
import { Readable } from "stream";

import { RexConfig } from "../../config.js";
import { IMediaItem, IMediaItemType, IProgressStatus } from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { ProgressManager } from "../progress/index.js";

@injectable()
export class MediaManager {
  constructor(
    private readonly config: RexConfig,
    private readonly logger: Logger,
    private readonly progressManager: ProgressManager,
  ) {}

  async download({
    user,
    url,
    destinationKey,
    progressId,
  }: {
    user: Pick<UserModel, "id" | "email">;
    url: string;
    destinationKey: string;
    progressId: string;
  }): Promise<void> {
    const filename = this.toFilename(user, destinationKey);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    const { data: stream, headers } = await axios.get<Readable>(url, {
      responseType: "stream",
    });
    const totalSize = Number(headers["content-length"]);
    let fetchedSize = 0;
    const loggedPercents = [0];
    const onLogError = (err: Error): void => {
      this.logger.error("downloadMedia.logComplete", err, {
        destinationKey,
        progressId,
        url,
        userId: user.id,
      });
    };
    stream.pause();
    stream.on("data", (chunk: Buffer) => {
      const percentComplete = Math.floor((fetchedSize / totalSize) * 100);
      fetchedSize += chunk.byteLength;
      if (
        percentComplete % 10 === 0 &&
        !loggedPercents.includes(percentComplete)
      ) {
        this.progressManager
          .addLogs(progressId, `${percentComplete}% complete`)
          .catch(onLogError);
        loggedPercents.push(percentComplete);
      }
    });
    stream.pipe(createWriteStream(filename));
    stream.on("end", () => {
      this.progressManager
        .addLogs(
          progressId,
          `Finished downloading ${url} to ${destinationKey}`,
          IProgressStatus.Complete,
        )
        .catch(onLogError);
    });
    await this.progressManager.addLogs(
      progressId,
      "Started download",
      IProgressStatus.InProgress,
    );
    stream.resume();
  }

  async create({
    user,
    key,
    data,
  }: {
    user: Pick<UserModel, "email">;
    key: string;
    data: string | Buffer;
  }): Promise<void> {
    const filename = this.toFilename(user, key);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, data);
  }

  async list(
    user: Pick<UserModel, "id" | "email">,
    dir: string,
  ): Promise<IMediaItem[]> {
    const baseDir = this.toFilename(user, dir);
    let files: string[];
    try {
      files = (await fs.readdir(baseDir)).filter((f) => !f.startsWith("."));
    } catch {
      await fs.mkdir(baseDir, { recursive: true });
      return [];
    }
    return Promise.all(
      files.map(async (filename) => {
        const stats = await fs.stat(path.resolve(baseDir, filename));
        let type = IMediaItemType.File;
        if (stats.isDirectory()) {
          const seriesStats = await fs
            .stat(path.resolve(baseDir, filename, ".series"))
            .catch(() => undefined);
          type = seriesStats?.isFile()
            ? IMediaItemType.Series
            : IMediaItemType.Directory;
        }
        const [key = ""] = filename.split("/").slice(-1);
        return {
          key,
          type,
        };
      }),
    );
  }

  async getSize(user: Pick<UserModel, "email">, key: string): Promise<number> {
    const { size } = await fs.stat(this.toFilename(user, key));
    return size;
  }

  createReadStream(
    user: Pick<UserModel, "email">,
    key: string,
    { start, end }: { start: number; end?: number },
  ): Readable {
    return createReadStream(this.toFilename(user, key), { start, end });
  }

  async exists(user: Pick<UserModel, "email">, key: string): Promise<boolean> {
    try {
      await fs.access(this.toFilename(user, key));
      return true;
    } catch (err) {
      return false;
    }
  }

  async isFile(user: Pick<UserModel, "email">, key: string): Promise<boolean> {
    try {
      const stats = await fs.stat(this.toFilename(user, key));
      return stats.isFile();
    } catch (err) {
      return false;
    }
  }

  private toFilename(user: Pick<UserModel, "email">, key: string): string {
    const { mediaDir = "" } = this.config;
    if (mediaDir === "") {
      throw new Error("Missing environment variable MEDIA_DIR");
    }
    return path.resolve(
      mediaDir,
      user.email,
      key.replace(/^\//, "").replace(/\.\./g, ""),
    );
  }
}
