import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.changeTable("users", (t) => ({
    username: t.change(t.text().nullable(), t.text().unique().nullable()),
  }));
});
