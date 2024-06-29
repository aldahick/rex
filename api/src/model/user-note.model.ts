import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserTable } from "./user.model.js";

export type UserNoteModel = Selectable<UserNoteTable>;
export class UserNoteTable extends BaseTable {
  table = "user_notes";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid(),
    title: t.text(),
    body: t.text(),
    createdAt: t.timestamp(),
  }));
  relations = {
    user: this.hasOne(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
    }),
  };
}
