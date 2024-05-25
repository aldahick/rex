import { injectable } from "@athenajs/core";
import { OrchidORM, orchidORM } from "orchid-orm";
import { RexConfig } from "../../config.js";
import { ProgressTable } from "../../model/progress.model.js";
import { ProgressLogTable } from "../../model/progressLog.model.js";
import { RoleTable } from "../../model/role.model.js";
import { SteamGameTable } from "../../model/steamGame.model.js";
import { TranscriptionTable } from "../../model/transcription.model.js";
import { UserTable } from "../../model/user.model.js";
import { UserNoteTable } from "../../model/userNote.model.js";
import { UserRoleTable } from "../../model/userRole.model.js";

const tables = {
  progress: ProgressTable,
  progressLogs: ProgressLogTable,
  roles: RoleTable,
  steamGames: SteamGameTable,
  transcriptions: TranscriptionTable,
  users: UserTable,
  userNotes: UserNoteTable,
  userRoles: UserRoleTable,
};
type Client = OrchidORM<typeof tables>;
type DbTables = {
  [Key in keyof typeof tables]: Client[Key];
};

@injectable()
export class DatabaseService implements DbTables {
  readonly orm: Client;

  readonly progress: DbTables["progress"];
  readonly progressLogs: DbTables["progressLogs"];
  readonly roles: DbTables["roles"];
  readonly steamGames: DbTables["steamGames"];
  readonly transcriptions: DbTables["transcriptions"];
  readonly users: DbTables["users"];
  readonly userNotes: DbTables["userNotes"];
  readonly userRoles: DbTables["userRoles"];

  constructor(config: RexConfig) {
    this.orm = orchidORM(
      {
        databaseURL: config.postgresUrl,
        log: config.log.database,
      },
      tables,
    );

    this.progress = this.orm.progress;
    this.progressLogs = this.orm.progressLogs;
    this.roles = this.orm.roles;
    this.steamGames = this.orm.steamGames;
    this.transcriptions = this.orm.transcriptions;
    this.users = this.orm.users;
    this.userNotes = this.orm.userNotes;
    this.userRoles = this.orm.userRoles;
  }
}