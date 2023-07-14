import { ITranscriptionStatus } from "../graphql.js";
import { UserTable } from "../model/user.model.js";
import { change } from "../util/orchid.js";

change(async (db) => {
  await db.createEnum(
    "transcription_status",
    Object.values(ITranscriptionStatus) as [ITranscriptionStatus],
  );
  await db.createTable("transcriptions", (t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid().foreignKey(() => UserTable, "id"),
    createdAt: t.timestamp().default("now()"),
    filename: t.varchar(),
    inputKey: t.varchar(),
    outputKey: t.varchar(),
    status: t.enum("transcription_status"),
  }));
});
