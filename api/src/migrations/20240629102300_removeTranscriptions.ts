import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.dropTable("transcriptions");
});
