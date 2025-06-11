import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.changeTable("users", (t) => ({
    jiraHost: t.add(t.text().nullable()),
    jiraApiToken: t.add(t.text().nullable()),
  }));
});
