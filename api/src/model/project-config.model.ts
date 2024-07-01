import { IProjectAdapterType } from "@aldahick/rex-sdk";
import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";
import { UserTable } from "./user.model.js";

export type ProjectConfigModel = Selectable<ProjectConfigTable>;
export class ProjectConfigTable extends BaseTable {
  table = "project_configs";

  columns = this.setColumns(
    (t) => ({
      userId: t
        .uuid()
        .foreignKey(() => UserTable, "id", { onDelete: "CASCADE" }),
      adapterType: t.tsEnum("project_adapter_type", IProjectAdapterType),
      host: t.text(),
      email: t.text(),
      apiToken: t.text(),
    }),
    (t) => [t.primaryKey(["userId", "adapterType"])],
  );

  relations = {
    user: this.hasOne(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
      required: true,
    }),
  };
}
