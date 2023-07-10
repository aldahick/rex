import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";

import {
  IAuthPermission,
  IMutation,
  IQuery,
  IQuerySteamGamesArgs,
  IQuerySteamPlayerArgs,
  IQuerySteamPlayersArgs,
  ISteamPlayer,
} from "../../graphql.js";
import { SteamGameModel } from "../../model/index.js";
import { SteamPlayer } from "../../service/steam/index.js";
import { RexContext } from "../auth/index.js";
import { ProgressManager, ProgressResolver } from "../progress/index.js";
import { SteamGameManager } from "./steamGame.manager.js";
import { SteamPlayerManager } from "./steamPlayer.manager.js";

const SEARCH_PAGE_SIZE = 100;

@resolver()
export class SteamResolver {
  constructor(
    private readonly progressManager: ProgressManager,
    private readonly progressResolver: ProgressResolver,
    private readonly steamGameManager: SteamGameManager,
    private readonly steamPlayerManager: SteamPlayerManager
  ) {}

  @resolveMutation()
  async fetchSteamGames(
    root: never,
    args: never,
    context: RexContext
  ): Promise<IMutation["fetchSteamGames"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminSteam))) {
      throw new Error("Forbidden");
    }
    const progress = await this.progressManager.create("fetchSteamGames");
    this.progressManager.resolveSafe(
      progress.id,
      this.steamGameManager.fetchAll(progress.id)
    );
    return this.progressResolver.makeGql(progress);
  }

  @resolveQuery()
  async steamGames(
    root: never,
    { page, search }: IQuerySteamGamesArgs
  ): Promise<IQuery["steamGames"]> {
    return this.steamGameManager.search(search, {
      offset: page * SEARCH_PAGE_SIZE,
      limit: SEARCH_PAGE_SIZE,
    });
  }

  @resolveQuery()
  async steamPlayer(
    root: never,
    { steamId64 }: IQuerySteamPlayerArgs
  ): Promise<IQuery["steamPlayer"]> {
    const { player, ownedGames = [] } = await this.steamPlayerManager.get(
      steamId64
    );
    return this.makeGql(player, ownedGames);
  }

  @resolveQuery()
  async steamPlayers(
    root: never,
    { steamIds64 }: IQuerySteamPlayersArgs
  ): Promise<IQuery["steamPlayers"]> {
    const players = await this.steamPlayerManager.getMany(steamIds64);
    return players.map(({ player, ownedGames = [] }) =>
      this.makeGql(player, ownedGames)
    );
  }

  private makeGql(
    player: SteamPlayer,
    ownedGames: SteamGameModel[]
  ): ISteamPlayer {
    return {
      ...player,
      id: player.id,
      playingGame:
        player.playingGameId !== undefined
          ? ownedGames.find((g) => g.id === player.playingGameId)
          : undefined,
      ownedGames: ownedGames.sort((a, b) => a.name.localeCompare(b.name)),
    };
  }
}
