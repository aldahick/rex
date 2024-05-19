import { injectable } from "@athenajs/core";
import { IAuthPermission } from "../../graphql.js";
import { RoleModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database/database.service.js";

@injectable()
export class RoleManager {
  constructor(private readonly db: DatabaseService) {}

  async fetch(id: string): Promise<RoleModel> {
    const role = await this.db.roles.find(id).selectAll();
    if (!role) {
      throw new Error(`Role ${id} not found`);
    }
    return role;
  }

  async fetchMany(): Promise<RoleModel[]> {
    return await this.db.roles.selectAll();
  }

  async create(name: string): Promise<RoleModel> {
    return await this.db.roles.create({
      name,
      permissions: [],
    });
  }

  async delete(roleId: string): Promise<void> {
    await this.db.roles.find(roleId).delete();
  }

  async update(roleId: string, { name }: { name: string }): Promise<void> {
    await this.db.roles.find(roleId).update({ name });
  }

  async updatePermissions(
    roleId: string,
    permissions: IAuthPermission[],
  ): Promise<void> {
    await this.db.roles.find(roleId).update({ permissions });
  }
}
