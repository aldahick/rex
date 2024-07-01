import { injectable } from "@athenajs/core";
import { OrchidORM, orchidORM } from "orchid-orm";
import { RexConfig } from "../../config.js";
import { ProgressLogTable } from "../../model/progress-log.model.js";
import { ProgressTable } from "../../model/progress.model.js";
import { ProjectConfigTable } from "../../model/project-config.model.js";
import { RoleTable } from "../../model/role.model.js";
import { SteamGameTable } from "../../model/steam-game.model.js";
import { UserRoleTable } from "../../model/user-role.model.js";
import { UserTable } from "../../model/user.model.js";

const tables = {
  progress: ProgressTable,
  progressLogs: ProgressLogTable,
  projectConfigs: ProjectConfigTable,
  roles: RoleTable,
  steamGames: SteamGameTable,
  users: UserTable,
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
  readonly projectConfigs: DbTables["projectConfigs"];
  readonly roles: DbTables["roles"];
  readonly steamGames: DbTables["steamGames"];
  readonly users: DbTables["users"];
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
    this.projectConfigs = this.orm.projectConfigs;
    this.roles = this.orm.roles;
    this.steamGames = this.orm.steamGames;
    this.users = this.orm.users;
    this.userRoles = this.orm.userRoles;
  }

  transaction<T>(transact: () => Promise<T>): Promise<T> {
    return this.orm.$transaction(transact);
  }
}
