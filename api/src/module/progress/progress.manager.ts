import { injectable } from "@athenajs/core";

import { IProgressStatus } from "../../graphql.js";
import { ProgressModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database.service.js";

@injectable()
export class ProgressManager {
  constructor(private readonly db: DatabaseService) {}

  async fetch(id: string): Promise<ProgressModel> {
    const progress = await this.db.progress.find(id).selectAll();
    if (!progress) {
      throw new Error(`Progress ${id} not found`);
    }
    return progress;
  }

  async fetchMany(ids: string[]): Promise<ProgressModel[]> {
    return await this.db.progress.whereIn("id", ids);
  }

  async create(action: string): Promise<ProgressModel> {
    return this.db.progress.create({
      action,
      createdAt: new Date(),
      status: IProgressStatus.Created,
    });
  }

  async addLogs(
    id: string,
    logs: string | string[],
    status?: IProgressStatus,
  ): Promise<void> {
    await this.db.progressLogs.createMany(
      (logs instanceof Array ? logs : [logs]).map((text) => ({
        text,
        createdAt: new Date(),
      })),
    );
    if (status) {
      await this.db.progress.where({ id }).update({ status });
    }
  }

  resolveSafe(progressId: string, promise: Promise<void>): void {
    promise.catch(async (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : (err as string);
      await this.addLogs(
        progressId,
        `An unexpected error occurred: ${errorMessage}`,
      );
    });
  }
}
