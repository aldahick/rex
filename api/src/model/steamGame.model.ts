import { Selectable } from "orchid-orm";
import { BaseTable } from "./base.table.js";

export type SteamGameModel = Selectable<SteamGameTable>;
export class SteamGameTable extends BaseTable {
  table = "steam_games";
  columns = this.setColumns((t) => ({
    id: t.integer().primaryKey(),
    name: t.varchar(),
  }));
}
