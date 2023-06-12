import { BaseTable } from "./base.table.js";
import { RoleTable } from "./role.model.js";
import { UserTable } from "./user.model.js";

export type UserRoleModel = UserRoleTable["columns"]["type"];
export class UserRoleTable extends BaseTable {
  table = "user_roles";
  columns = this.setColumns((t) => ({
    userId: t.uuid().primaryKey(),
    roleId: t.uuid().primaryKey(),
  }));
  relations = {
    user: this.hasOne(() => UserTable, {
      primaryKey: "userId",
      foreignKey: "id",
    }),
    role: this.hasOne(() => RoleTable, {
      primaryKey: "roleId",
      foreignKey: "id",
    }),
  };
}
