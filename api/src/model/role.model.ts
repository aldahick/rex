import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserRoleTable } from "./userRole.model.js";

export type RoleModel = Selectable<RoleTable>;
export class RoleTable extends BaseTable {
  table = "roles";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
    permissions: t.array(t.varchar()),
  }));
  relations = {
    users: this.hasMany(() => UserRoleTable, {
      primaryKey: "id",
      foreignKey: "roleId",
    }),
  };
}
