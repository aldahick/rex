import { ITranscriptionStatus } from "../graphql.js";
import { BaseTable } from "./base.table.js";
import { UserTable } from "./user.model.js";

export type TranscriptionModel = TranscriptionTable["columns"]["type"];
export class TranscriptionTable extends BaseTable {
  table = "transcriptions";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid(),
    createdAt: t.timestamp().default("current_timestamp"),
    // no file ending, used to download same filename as uploaded
    filename: t.varchar(),
    inputKey: t.varchar(),
    outputKey: t.varchar(),
    status: t.enum(
      "transcription_status",
      Object.values(ITranscriptionStatus) as [
        ITranscriptionStatus,
        ...ITranscriptionStatus[]
      ]
    ),
  }));
  relations = {
    user: this.hasOne(() => UserTable, {
      primaryKey: "userId",
      foreignKey: "id",
    }),
  };
}