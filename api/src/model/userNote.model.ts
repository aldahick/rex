import { BaseTable } from "./base.table.js";
import { UserTable } from "./user.model.js";

export type UserNoteModel = UserNoteTable["columns"]["type"];
export class UserNoteTable extends BaseTable {
  table = "user_notes";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid(),
    title: t.varchar(),
    body: t.varchar(),
    createdAt: t.timestamp(),
  }));
  relations = {
    user: this.hasOne(() => UserTable, {
      primaryKey: "userId",
      foreignKey: "id",
    }),
  };
}
