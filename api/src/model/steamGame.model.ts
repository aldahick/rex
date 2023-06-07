import { BaseTable } from "./base.table.js";

export type SteamGameModel = SteamGameTable["columns"]["type"];
export class SteamGameTable extends BaseTable {
  table = "steam_games";
  columns = this.setColumns((t) => ({
    id: t.integer().primaryKey(),
    name: t.varchar(),
  }));
}
