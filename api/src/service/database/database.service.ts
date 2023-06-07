import { injectable } from "@athenajs/core";
import { DbTable, OrchidORM, orchidORM } from "orchid-orm";

import { Config } from "../../config.js";
import { ProgressTable } from "../../model/progress.model.js";
import { ProgressLogTable } from "../../model/progressLog.model.js";
import { RoleTable } from "../../model/role.model.js";
import { SteamGameTable } from "../../model/steamGame.model.js";
import { UserTable } from "../../model/user.model.js";
import { UserNoteTable } from "../../model/userNote.model.js";

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
export class DatabaseService extends OrchidORM {
  readonly orm: OrchidORM<typeof tables>;

  readonly progress;
  readonly users: DbTables["users"];

  constructor(config: Config) {
    this.orm = orchidORM(
      {
        databaseURL: config.postgresUrl,
        log: false,
      },
      tables
    );

    this.medias = this.orm.medias;
    this.mediaAudios = this.orm.mediaAudios;
    this.mediaStoryChapters = this.orm.mediaStoryChapters;
    this.mediaFavorites = this.orm.mediaFavorites;
    this.mediaTags = this.orm.mediaTags;
    this.users = this.orm.users;
  }
}
