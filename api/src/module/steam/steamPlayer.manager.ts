import { injectable } from "@athenajs/core";
import { compact } from "@athenajs/utils";
import { SteamGameModel } from "../../model/index.js";
import { SteamPlayer } from "../../service/steam/SteamPlayer.js";
import { SteamService } from "../../service/steam/steam.service.js";
import { SteamGameManager } from "./steamGame.manager.js";

export interface SteamPlayerWithGames {
  ownedGames?: SteamGameModel[];
  player: SteamPlayer;
}

@injectable()
export class SteamPlayerManager {
  constructor(
    private readonly steamGameManager: SteamGameManager,
    private readonly steamService: SteamService,
  ) {}

  async get(steamId64: string): Promise<SteamPlayerWithGames> {
    const player = await this.steamService.getPlayerSummary(steamId64);
    if (!player) {
      throw new Error(`Steam player ${steamId64} not found`);
    }
    const ownedGameIds =
      await this.steamService.getPlayerOwnedGameIds(steamId64);
    const ownedGames = ownedGameIds
      ? await this.steamGameManager.getMany(ownedGameIds)
      : [];
    return {
      player,
      ownedGames,
    };
  }

  async getMany(steamIds64: string[]): Promise<SteamPlayerWithGames[]> {
    const players = compact(
      await Promise.all(
        steamIds64.map(async (steamId64) => {
          const player = await this.steamService.getPlayerSummary(steamId64);
          return player
            ? {
                player,
                ownedGameIds: await this.steamService.getPlayerOwnedGameIds(
                  player.id,
                ),
              }
            : undefined;
        }),
      ),
    );
    if (players.length !== steamIds64.length) {
      throw new Error("Some steam players could not be found");
    }
    const ownedGames = await this.steamGameManager.getMany(
      players.flatMap((p) => p.ownedGameIds ?? []),
    );
    return players.map(({ player, ownedGameIds }) => ({
      player,
      ownedGames: ownedGameIds
        ? ownedGames.filter((g) => ownedGameIds.includes(g.id))
        : ownedGameIds,
    }));
  }

  async resolveUsernames(identifiers: string[]): Promise<string[]> {
    return await Promise.all(
      identifiers.map(async (identifier) => {
        const steamId =
          await this.steamService.getSteamId64FromUsername(identifier);
        return steamId ?? identifier;
      }),
    );
  }
}
