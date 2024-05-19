import { Logger } from "@athenajs/core";
import { compact } from "@athenajs/utils";
import { Message } from "discord.js";
import {
  DiscordCommand,
  discordCommand,
} from "../../service/discord/discord.service.js";
import { HastebinService } from "../../service/hastebin/hastebin.service.js";
import {
  SteamPlayerManager,
  SteamPlayerWithGames,
} from "./steamPlayer.manager.js";

@discordCommand()
export class SteamGamesCommand implements DiscordCommand {
  command = ["steamGames", "commonSteamGames"];
  helpText = "Finds all games that the given Steam users have in common.";

  constructor(
    private readonly hastebinService: HastebinService,
    private readonly logger: Logger,
    private readonly steamPlayerManager: SteamPlayerManager,
  ) {}

  async handle(
    message: Message,
    identifiers: string[],
    command: string,
  ): Promise<string | undefined> {
    if (!identifiers.length) {
      return `Usage: ${command} <steam usernames or ids...>`;
    }
    const steamIds =
      await this.steamPlayerManager.resolveUsernames(identifiers);
    let players: SteamPlayerWithGames[];
    const res = await message.reply("Gimme a second to think about it...");
    try {
      players = await this.steamPlayerManager.getMany(steamIds);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof Error) {
        await res.edit(
          `
An error occurred: ${err.message}
You may have given a bad user ID - make sure to use your steam ID (if your profile URL is https://steamcommunity.com/id/tiin57, give me "tiin57")
`.trim(),
        );
      }
      return;
    }
    const playersWithoutGames = players.filter((p) => !p.ownedGames);
    const playersWithGames = players.filter((p) => !!p.ownedGames);
    const allOwnedGames = playersWithGames.flatMap((p) => p.ownedGames ?? []);
    const gameNames = new Map(allOwnedGames.map((g) => [g.id, g.name]));
    const gameCounts = new Map<number, number>();
    for (const game of allOwnedGames) {
      gameCounts.set(game.id, (gameCounts.get(game.id) ?? 0) + 1);
    }
    const commonGameNames = [];
    for (const [gameId, count] of gameCounts.entries()) {
      if (count === playersWithGames.length) {
        commonGameNames.push(gameNames.get(gameId));
      }
    }
    const body = compact(commonGameNames)
      .sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()),
      )
      .map((name) => `* ${name}`)
      .join("\n");
    const hastebinUrl = await this.hastebinService.create(body);
    const gamePlayerNames = playersWithGames
      .map((p) => p.player.nickname)
      .join(", ");
    const noGamePlayerNames = playersWithoutGames
      .map((p) => p.player.nickname)
      .join(", ");
    await res.edit(
      `Common Steam games for ${gamePlayerNames}: ${hastebinUrl}.md
      ${
        noGamePlayerNames.length
          ? `Some of them have their profiles set to private: ${noGamePlayerNames}`
          : ""
      }
`.trim(),
    );
  }
}
