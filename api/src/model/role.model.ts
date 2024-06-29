import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserRoleTable } from "./user-role.model.js";

export type RoleModel = Selectable<RoleTable>;
export class RoleTable extends BaseTable {
  table = "roles";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.text(),
    permissions: t.array(t.text()),
  }));
  relations = {
    users: this.hasMany(() => UserRoleTable, {
      columns: ["id"],
      references: ["roleId"],
    }),
  };
}
