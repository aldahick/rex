import { container } from "@athenajs/core";
import axios from "axios";
import {
  MockInstance,
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RexConfig } from "../../config.js";
import { SteamService } from "./steam.service.js";

describe("SteamService", () => {
  const mockConfig = vi.fn();
  const service = () => container.resolve(SteamService);
  let mockGet: MockInstance;
  beforeAll(() => {
    mockGet = vi.spyOn(axios, "get");
    container.reset();
    container.register(RexConfig, { useFactory: mockConfig });
  });

  beforeEach(() => {
    mockConfig.mockReturnValue({
      steamApiKey: "",
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("getAllGames()", () => {
    it("should return all Steam games", async () => {
      mockGet.mockResolvedValue({
        data: {
          applist: {
            apps: [
              {
                appid: 1,
                name: "First Game",
              },
              {
                appid: 2,
                name: "Second Game",
              },
            ],
          },
        },
      });
      const expected = [
        { id: 1, name: "First Game" },
        { id: 2, name: "Second Game" },
      ];
      const actual = await service().getAllGames();
      expect(actual).toEqual(expected);
      expect(mockGet).toHaveBeenCalledOnce();
    });
  });

  describe("getPlayerSummary()", () => {
    it("should throw when STEAM_API_KEY is unset", async () => {
      mockConfig.mockReturnValue({});
      const actual = () => service().getPlayerSummary("");
      await expect(actual).rejects.toThrow(
        new Error("Missing environment variable STEAM_API_KEY"),
      );
    });

    it("should throw if no player is found", async () => {
      mockGet.mockResolvedValue({
        data: {
          response: {
            players: [],
          },
        },
      });
      const actual = () => service().getPlayerSummary("");
      await expect(actual).rejects.toThrow(
        new Error('no players found for steamid=""'),
      );
    });

    it("should return player summary when playing a game", async () => {
      mockGet.mockResolvedValue({
        data: {
          response: {
            players: [
              {
                steamid: "steam id",
                personaname: "nickname",
                avatarfull: "avatar url",
                profileurl: "profile url",
                gameid: "100",
              },
            ],
          },
        },
      });
      const expected = {
        id: "steam id",
        nickname: "nickname",
        avatarUrl: "avatar url",
        profileUrl: "profile url",
        playingGameId: 100,
      };
      const actual = await service().getPlayerSummary("");
      expect(actual).toEqual(expected);
    });

    it("should return player summary when not playing a game", async () => {
      mockGet.mockResolvedValue({
        data: {
          response: {
            players: [
              {
                steamid: "steam id",
                personaname: "nickname",
                avatarfull: "avatar url",
                profileurl: "profile url",
                playingGameId: "",
              },
            ],
          },
        },
      });
      const expected = {
        id: "steam id",
        nickname: "nickname",
        avatarUrl: "avatar url",
        profileUrl: "profile url",
        playingGameId: undefined,
      };
      const actual = await service().getPlayerSummary("");
      expect(actual).toEqual(expected);
    });
  });

  describe("getPlayerOwnedGameIds()", () => {
    it("should return games owned by the player", async () => {
      mockGet.mockResolvedValue({
        data: { response: { games: [{ appid: 100 }] } },
      });
      const actual = await service().getPlayerOwnedGameIds("");
      expect(actual).toEqual([100]);
    });

    it("should return no games if the player has a private library", async () => {
      mockGet.mockResolvedValue({
        data: { response: {} },
      });
      const actual = await service().getPlayerOwnedGameIds("");
      expect(actual).toEqual(undefined);
    });
  });

  describe("getSteamId64FromUsername()", () => {
    it("should return steam ID by username", async () => {
      mockGet.mockResolvedValue({
        data: { response: { steamid: "steam id" } },
      });
      const actual = await service().getSteamId64FromUsername("username");
      expect(actual).toEqual("steam id");
    });
  });
});
