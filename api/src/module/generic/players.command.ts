import { Logger } from "@athenajs/core";
import { Message } from "discord.js";
import Gamedig from "gamedig";
import pluralize from "pluralize";

import {
  DiscordCommand,
  discordCommand,
} from "../../service/discord.service.js";

@discordCommand()
export class PlayersCommand implements DiscordCommand {
  readonly command = "players";
  readonly helpText =
    "Tells you who's playing on a given server IP. (Works with lots of games!)";
  constructor(private readonly logger: Logger) {}
  async handle(
    message: Message<boolean>,
    args: string[],
    command: string,
  ): Promise<string | undefined> {
    const [serverUrl] = args;
    if (!serverUrl) {
      return `Usage: ${command} <game>://<host>:[port] (example: ${command} minecraft://google.com:25565) (port is not required)`;
    }
    let query: Gamedig.QueryOptions;
    try {
      const { protocol, hostname, port } = new URL(serverUrl);
      query = {
        type: protocol.replace(/\:$/, "") as Gamedig.Type,
        host: hostname,
        port: Number(port),
      };
    } catch {
      return "I don't know how to ping that URL.";
    }
    const res = await message.reply("Gimme a second to think about it...");
    let players: Gamedig.QueryResult["players"];
    try {
      players = (await Gamedig.query(query)).players;
    } catch (err) {
      this.logger.error("failed to query server for players command: " + err);
      await res.edit(err instanceof Error ? err.message : (err as string));
      return;
    }
    const names = players
      .map((p) => p.name ?? "")
      .sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()),
      )
      .filter((n) => !!n.trim());
    const playersText = pluralize("player", names.length);
    const punctuation = players.length ? ":" : ".";
    const response = `There are ${
      names.length
    } ${playersText} on ${serverUrl}${punctuation} ${names.join(", ")}`;
    await res.edit(response.trim());
  }
}
