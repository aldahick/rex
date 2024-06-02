import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserNoteTable } from "./user-note.model.js";
import { UserRoleTable } from "./user-role.model.js";

export type UserModel = Selectable<UserTable>;
export class UserTable extends BaseTable {
  table = "users";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    email: t.varchar().unique(),
    username: t.varchar().nullable(),
    passwordHash: t.varchar().nullable(),
    jiraHost: t.varchar().nullable(),
    jiraApiToken: t.varchar().nullable(),
  }));
  relations = {
    notes: this.hasMany(() => UserNoteTable, {
      primaryKey: "id",
      foreignKey: "userId",
    }),
    roles: this.hasMany(() => UserRoleTable, {
      primaryKey: "id",
      foreignKey: "userId",
    }),
  };
}
