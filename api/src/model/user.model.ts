import { BaseTable } from "./base.table.js";
import { RoleTable } from "./role.model.js";
import { UserNoteTable } from "./userNote.model.js";

export type UserModel = UserTable["columns"]["type"];
export class UserTable extends BaseTable {
  table = "users";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    email: t.varchar().unique(),
    username: t.varchar().nullable(),
  }));
  relations = {
    notes: this.hasMany(() => UserNoteTable, {
      primaryKey: "id",
      foreignKey: "userId",
    }),
    roles: this.hasAndBelongsToMany(() => RoleTable, {
      primaryKey: "id",
      foreignKey: "userId",
      associationPrimaryKey: "id",
      associationForeignKey: "roleId",
      joinTable: "user_roles",
    }),
  };
}
