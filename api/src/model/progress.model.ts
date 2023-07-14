import { IProgressStatus } from "../graphql.js";
import { BaseTable } from "./base.table.js";
import { ProgressLogTable } from "./progressLog.model.js";

export type ProgressModel = ProgressTable["columns"]["type"];
export class ProgressTable extends BaseTable {
  table = "progress";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    action: t.varchar(),
    createdAt: t.timestamp(),
    status: t.enum(
      "progress_status",
      Object.values(IProgressStatus) as [IProgressStatus, ...IProgressStatus[]],
    ),
  }));
  relations = {
    logs: this.hasMany(() => ProgressLogTable, {
      primaryKey: "id",
      foreignKey: "progressId",
    }),
  };
}
