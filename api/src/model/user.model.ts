import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserRoleTable } from "./user-role.model.js";

export type UserModel = Selectable<UserTable>;
export class UserTable extends BaseTable {
  table = "users";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    email: t.text().unique(),
    username: t.text().unique().nullable(),
    passwordHash: t.text().nullable(),
    jiraHost: t.text().nullable(),
    jiraApiToken: t.text().nullable(),
  }));
  relations = {
    roles: this.hasMany(() => UserRoleTable, {
      columns: ["id"],
      references: ["userId"],
    }),
  };
}
