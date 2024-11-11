import fs from "node:fs/promises";
import path from "node:path";
import { injectable } from "@athenajs/core";
import { FileService } from "./file.service.js";

@injectable()
export class FileUsageService {
  constructor(private readonly fileService: FileService) {}

  async getUsedSpace(key: string): Promise<number> {
    const children = await this.fileService.list(key).catch(() => []);
    const dirPath = this.fileService.getFilename(key);
    let total = 0;
    for (const child of children) {
      if (child.isFile()) {
        const stats = await fs.stat(path.join(dirPath, child.name));
        total += stats.size;
      } else {
        total += await this.getUsedSpace(path.join(key, child.name));
      }
    }
    return total;
  }
}
