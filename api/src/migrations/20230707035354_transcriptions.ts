import { UserTable } from "../model/user.model.js";
import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.createEnum("transcription_status", [
    "COMPLETE",
    "CREATED",
    "ERRORED",
    "STARTED",
  ]);
  await db.createTable("transcriptions", (t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid().foreignKey(() => UserTable, "id"),
    createdAt: t.timestamp().default("now()"),
    filename: t.text(),
    inputKey: t.text(),
    outputKey: t.text(),
    status: t.enum("transcription_status"),
  }));
});
