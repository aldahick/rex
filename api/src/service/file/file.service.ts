import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { injectable } from "@athenajs/core";
import { RexConfig } from "../../config.js";

export interface ReadableStreamOptions {
  start?: number;
  end?: number;
}

@injectable()
export class FileService {
  constructor(private readonly config: RexConfig) {}

  createReadStream(key: string, options?: ReadableStreamOptions) {
    return createReadStream(this.getFilename(key), options);
  }

  async createWriteStream(key: string) {
    const filename = this.getFilename(key);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    return createWriteStream(filename);
  }

  /**
   * @returns an empty array if `key` refers to a file, not a directory
   */
  async list(key: string) {
    try {
      return await fs.readdir(this.getFilename(key), { withFileTypes: true });
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "ENOTDIR") {
        return [];
      }
      throw err;
    }
  }

  async stat(key: string) {
    const filename = this.getFilename(key);
    try {
      return await fs.stat(filename);
    } catch {}
  }

  async write(key: string, data: string | Readable) {
    const filename = this.getFilename(key);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, data);
  }

  async delete(key: string) {
    const path = this.getFilename(key);
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

  getFilename(key: string) {
    return path.resolve(
      this.root,
      key.replace(/^\//, "").replace(/\.{2}/g, ""),
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
