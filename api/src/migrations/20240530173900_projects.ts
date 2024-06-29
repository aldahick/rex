import { UserTable } from "../model/user.model.js";
import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.createEnum("project_adapter_type", ["JIRA"]);
  await db.createTable(
    "project_configs",
    (t) => ({
      userId: t
        .uuid()
        .foreignKey(() => UserTable, "id", { onDelete: "CASCADE" }),
      adapterType: t.enum("project_adapter_type"),
      host: t.text(),
      email: t.text(),
      apiToken: t.text(),
    }),
    (t) => [t.primaryKey(["userId", "adapterType"])],
  );
});
