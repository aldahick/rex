import { resolve as resolveUrl } from "node:url";
import { injectable } from "@athenajs/core";
import axios from "axios";
import { RexConfig } from "../../config.js";
import { SteamPlayer } from "./SteamPlayer.js";
import { GetOwnedGames } from "./dto/GetOwnedGames.js";
import { GetPlayerSummaries } from "./dto/GetPlayerSummaries.js";
import { ResolveVanityUrl } from "./dto/ResolveVanityUrl.js";

const BASE_URL = "https://api.steampowered.com";

@injectable()
export class SteamService {
  constructor(private readonly config: RexConfig) {}

  async getAllGames(): Promise<{ id: number; name: string }[]> {
    const url = resolveUrl(BASE_URL, "/ISteamApps/GetAppList/v2/");
    const { data } = await axios.get<{
      applist: {
        apps: {
          appid: number;
          name: string;
        }[];
      };
    }>(url);
    return data.applist.apps.map(({ appid: id, name }) => ({ id, name }));
  }

  async getPlayerSummary(steamId64: string): Promise<SteamPlayer | undefined> {
    const params = new URLSearchParams({
      key: this.apiKey,
      steamids: steamId64,
    }).toString();
    const url = resolveUrl(BASE_URL, "/ISteamUser/GetPlayerSummaries/v2/");
    const {
      data: {
        response: {
          players: [player],
        },
      },
    } = await axios.get<GetPlayerSummaries>(`${url}?${params}`);
    if (!player) {
      throw new Error(`no players found for steamid="${steamId64}"`);
    }
    return {
      id: player.steamid,
      nickname: player.personaname,
      avatarUrl: player.avatarfull,
      profileUrl: player.profileurl,
      playingGameId: player.gameid ? Number(player.gameid) : undefined,
    };
  }

  async getPlayerOwnedGameIds(
    steamId64: string,
  ): Promise<number[] | undefined> {
    const url = resolveUrl(BASE_URL, "/IPlayerService/GetOwnedGames/v0001/?");
    const {
      data: {
        response: { games },
      },
    } = await axios.get<GetOwnedGames>(
      url +
        new URLSearchParams({
          key: this.apiKey,
          steamid: steamId64,
        }).toString(),
    );
    return games?.map(({ appid }) => appid);
  }

  async getSteamId64FromUsername(
    username: string,
  ): Promise<string | undefined> {
    const url = resolveUrl(BASE_URL, "/ISteamUser/ResolveVanityURL/v0001/?");
    const {
      data: {
        response: { steamid },
      },
    } = await axios.get<ResolveVanityUrl>(
      url +
        new URLSearchParams({
          key: this.apiKey,
          vanityurl: username,
        }).toString(),
    );
    return steamid;
  }

  private get apiKey(): string {
    if (this.config.steamApiKey === undefined) {
      throw new Error("Missing environment variable STEAM_API_KEY");
    }
    return this.config.steamApiKey;
  }
}
