import {
  Dirent,
  Stats,
  createReadStream,
  createWriteStream,
  promises as fs,
} from "fs";
import path from "path";
import { Readable } from "stream";
import { Logger, injectable } from "@athenajs/core";
import axios from "axios";

import { RexConfig } from "../../config.js";
import { IMediaItem, IMediaItemType, IProgressStatus } from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { ProgressManager } from "../progress/index.js";

export type MediaStats = Stats;

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
        userId: user.id,
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

  async create(
    email: string,
    key: string,
    data: string | Readable,
  ): Promise<void> {
    const filename = this.toFilename({ email }, key);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, data);
  }

  async delete(email: string, key: string): Promise<void> {
    const path = this.toFilename({ email }, key);
    const stats = await fs.stat(path);
    if (stats.isDirectory()) {
      const children = await fs.readdir(path);
      if (children.length) {
        throw new Error("Cannot delete directory unless it's empty");
      }
      await fs.rmdir(path);
    } else {
      await fs.rm(path);
    }
  }

  async list(
    user: Pick<UserModel, "id" | "email">,
    dir: string,
  ): Promise<IMediaItem[]> {
    const baseDir = this.toFilename(user, dir);
    let entries: Dirent[];
    try {
      entries = (await fs.readdir(baseDir, { withFileTypes: true })).filter(
        (f) => !f.name.startsWith("."),
      );
    } catch (err) {
      if (err instanceof Error && "code" in err) {
        if ((err as NodeJS.ErrnoException).code === "ENOTDIR") {
          return [];
        }
      }
      await fs.mkdir(baseDir, { recursive: true });
      return [];
    }
    return Promise.all(
      entries.map(async (entry) => {
        let type = IMediaItemType.File;
        if (entry.isDirectory()) {
          const seriesStats = await fs
            .stat(path.resolve(baseDir, entry.name, ".series"))
            .catch(() => undefined);
          type = seriesStats?.isFile()
            ? IMediaItemType.Series
            : IMediaItemType.Directory;
        }
        return {
          key: entry.name,
          type,
        };
      }),
    );
  }

  createReadStream(
    user: Pick<UserModel, "email">,
    key: string,
    options?: { start: number; end: number },
  ): Readable {
    return createReadStream(this.toFilename(user, key), options);
  }

  async stat(
    user: Pick<UserModel, "email">,
    key: string,
  ): Promise<MediaStats | undefined> {
    try {
      return await fs.stat(this.toFilename(user, key));
    } catch {
      return undefined;
    }
  }

  /**
   * @returns the user's remaining media data limit, in bytes
   */
  async getRemainingSpace(user: Pick<UserModel, "email">): Promise<number> {
    const max = this.config.media.dataLimit;
    if (typeof max !== "number") {
      throw new Error("Cannot upload files: no data limit is configured");
    }
    return max - (await this.getUsedSpace(user));
  }

  async getUsedSpace(
    user: Pick<UserModel, "email">,
    key?: string,
  ): Promise<number> {
    const dirPath = this.toFilename(user, key ?? "");
    const children = await fs
      .readdir(dirPath, { withFileTypes: true })
      .catch(() => []);
    let total = 0;
    for (const child of children) {
      if (child.isFile()) {
        const stats = await fs.stat(path.resolve(dirPath, child.name));
        total += stats.size;
      } else {
        const childPath = this.toFilename(
          user,
          path.resolve(key ?? "", child.name),
        );
        total += await this.getUsedSpace(user, childPath);
      }
    }
    return total;
  }

  /**
   * @returns all emails of users who have media
   */
  async getAllEmails(): Promise<string[]> {
    return fs.readdir(this.root);
  }

  toFilename(user: Pick<UserModel, "email">, key: string): string {
    return path.resolve(
      this.root,
      user.email,
      key.replace(/^\//, "").replace(/\.\./g, ""),
    );
  }

  get root(): string {
    const { dir } = this.config.media;
    if (!dir) {
      throw new Error("Missing environment variable MEDIA_DIR");
    }
    return path.resolve(dir);
  }
}
