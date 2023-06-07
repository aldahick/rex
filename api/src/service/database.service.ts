import { injectable } from "@athenajs/core";
import { DbTable, OrchidORM, orchidORM } from "orchid-orm";

import { Config } from "../config.js";
import { ProgressTable } from "../model/progress.model.js";
import { ProgressLogTable } from "../model/progressLog.model.js";
import { RoleTable } from "../model/role.model.js";
import { SteamGameTable } from "../model/steamGame.model.js";
import { UserTable } from "../model/user.model.js";
import { UserNoteTable } from "../model/userNote.model.js";

const tables = {
  progress: ProgressTable,
  progressLogs: ProgressLogTable,
  roles: RoleTable,
  steamGames: SteamGameTable,
  users: UserTable,
  userNotes: UserNoteTable,
};
type DbTables = {
  [Key in keyof typeof tables]: DbTable<(typeof tables)[Key]>;
};

@injectable()
export class DatabaseService implements DbTables {
  readonly orm: OrchidORM<typeof tables>;

  readonly progress: DbTables["progress"];
  readonly progressLogs: DbTables["progressLogs"];
  readonly roles: DbTables["roles"];
  readonly steamGames: DbTables["steamGames"];
  readonly users: DbTables["users"];
  readonly userNotes: DbTables["userNotes"];

  constructor(config: Config) {
    this.orm = orchidORM(
      {
        databaseURL: config.postgresUrl,
        log: false,
      },
      tables
    );

    this.progress = this.orm.progress;
    this.progressLogs = this.orm.progressLogs;
    this.roles = this.orm.roles;
    this.steamGames = this.orm.steamGames;
    this.users = this.orm.users;
    this.userNotes = this.orm.userNotes;
  }
}
