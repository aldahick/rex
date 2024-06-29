import { Selectable } from "orchid-orm";
import { IProgressStatus } from "../graphql.js";
import { BaseTable } from "./base.table.js";
import { ProgressLogTable } from "./progress-log.model.js";

export type ProgressModel = Selectable<ProgressTable>;
export class ProgressTable extends BaseTable {
  table = "progress";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    action: t.text(),
    createdAt: t.timestamp(),
    status: t.tsEnum("progress_status", IProgressStatus),
  }));
  relations = {
    logs: this.hasMany(() => ProgressLogTable, {
      columns: ["id"],
      references: ["progressId"],
    }),
  };
}
