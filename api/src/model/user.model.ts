import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserNoteTable } from "./user-note.model.js";
import { UserRoleTable } from "./user-role.model.js";

export type UserModel = Selectable<UserTable>;
export class UserTable extends BaseTable {
  table = "users";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    email: t.text().unique(),
    username: t.text().nullable(),
    passwordHash: t.text().nullable(),
    jiraHost: t.text().nullable(),
    jiraApiToken: t.text().nullable(),
  }));
  relations = {
    notes: this.hasMany(() => UserNoteTable, {
      columns: ["id"],
      references: ["userId"],
    }),
    roles: this.hasMany(() => UserRoleTable, {
      columns: ["id"],
      references: ["userId"],
    }),
  };
}
