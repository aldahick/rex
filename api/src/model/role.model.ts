import { BaseTable } from "./base.table.js";

export type RoleModel = RoleTable["columns"]["type"];
export class RoleTable extends BaseTable {
  table = "roles";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
    permissions: t.array(t.varchar()),
  }));
}
