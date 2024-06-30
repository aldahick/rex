import { IProjectAdapterType, IProjectConfig } from "@aldahick/rex-sdk";
import { injectable } from "@athenajs/core";
import { DatabaseService } from "../../service/database/database.service.js";

@injectable()
export class ProjectConfigManager {
  constructor(private readonly db: DatabaseService) {}

  async get(userId: string, adapterType: IProjectAdapterType) {
    return await this.db.projectConfigs.findBy({ userId, adapterType });
  }

  async getMany(userIds: string[]) {
    return await this.db.projectConfigs
      .where({ userId: { in: userIds } })
      .selectAll();
  }

  async delete(
    userId: string,
    adapterType: IProjectAdapterType,
  ): Promise<boolean> {
    const deletedCount = await this.db.projectConfigs
      .where({ userId, adapterType })
      .delete();
    return deletedCount > 0;
  }

  async upsert(
    userId: string,
    fields: Omit<IProjectConfig, "userId">,
  ): Promise<boolean> {
    const updatedCount = await this.db.projectConfigs
      .insert({
        userId,
        ...fields,
      })
      .onConflict(["userId", "adapterType"])
      .merge();
    return updatedCount > 0;
  }
}
