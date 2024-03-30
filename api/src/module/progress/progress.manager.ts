import { Logger, injectable } from "@athenajs/core";
import { uniqueBy } from "remeda";
import { IProgressStatus } from "../../graphql.js";
import { ProgressModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database.service.js";

@injectable()
export class ProgressManager {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: Logger,
  ) {}

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
    const rows = (Array.isArray(logs) ? logs : [logs]).map((text) => ({
      progressId: id,
      text,
      createdAt: new Date(),
    }));
    await this.db.progressLogs.createMany(
      uniqueBy(rows, (r) => r.progressId + r.createdAt.getTime()),
    );
    if (status) {
      await this.updateStatus(id, status);
    }
  }

  async updateStatus(id: string, status: IProgressStatus) {
    await this.db.progress.where({ id }).update({ status });
  }

  resolveSafe(progressId: string, promise: Promise<void>): void {
    promise.catch(async (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : (err as string);
      try {
        await this.addLogs(
          progressId,
          `An unexpected error occurred: ${errorMessage}`,
        );
      } catch (saveErr) {
        const saveErrorMessage =
          err instanceof Error ? err.message : (err as string);
        this.logger.error(
          `Failed to save progress log for ID ${progressId}: ${saveErrorMessage}`,
        );
        this.logger.error(`Original error: ${errorMessage}`);
      }
    });
  }
}
