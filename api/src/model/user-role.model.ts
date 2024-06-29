import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { RoleTable } from "./role.model.js";
import { UserTable } from "./user.model.js";

export type UserRoleModel = Selectable<UserRoleTable>;
export class UserRoleTable extends BaseTable {
  table = "user_roles";
  columns = this.setColumns((t) => ({
    userId: t.uuid().primaryKey(),
    roleId: t.uuid().primaryKey(),
  }));
  relations = {
    user: this.hasOne(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
    }),
    role: this.hasOne(() => RoleTable, {
      columns: ["roleId"],
      references: ["id"],
    }),
  };
}
