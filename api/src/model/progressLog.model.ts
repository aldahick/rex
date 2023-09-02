import { Selectable } from "orchid-orm";

import { BaseTable } from "./base.table.js";
import { ProgressTable } from "./progress.model.js";

export type ProgressLogModel = Selectable<ProgressLogTable>;
export class ProgressLogTable extends BaseTable {
  table = "progress_logs";
  columns = this.setColumns((t) => ({
    progressId: t.uuid().primaryKey(),
    createdAt: t.timestamp().primaryKey(),
    text: t.varchar(),
  }));
  relations = {
    progress: this.hasOne(() => ProgressTable, {
      primaryKey: "progressId",
      foreignKey: "id",
    }),
  };
}
