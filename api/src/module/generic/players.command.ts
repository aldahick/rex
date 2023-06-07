import { Logger } from "@athenajs/core";
import { Message } from "discord.js";
import Gamedig from "gamedig";
import pluralize from "pluralize";
import * as url from "url";

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
    command: string
  ): Promise<string | undefined> {
    const [serverUrl] = args;
    if (!serverUrl) {
      return `Usage: ${command} <game>://<host>:[port] (example: ${command} minecraft://tiin57.net:25565) (port is not required)`;
    }
    const { protocol, hostname, port } = url.parse(serverUrl);
    if (protocol === null || hostname === null) {
      return "I don't know how to ping that URL.";
    }
    const res = await message.reply("Gimme a second to think about it...");
    let players: Gamedig.QueryResult["players"];
    try {
      players = await Gamedig.query({
        type: protocol.replace(/\:$/, "") as Gamedig.Type,
        host: hostname,
        port: Number(port),
      }).then((r) => r.players);
    } catch (err) {
      this.logger.error("failed to query server for players command: " + err);
      await res.edit(err instanceof Error ? err.message : (err as string));
      return;
    }
    const playerNames = players
      .map((p) => p.name ?? "")
      .sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
      )
      .filter((n) => !!n.trim());
    await res.edit(
      `
There are ${playerNames.length} ${pluralize(
        "player",
        playerNames.length
      )} on ${serverUrl}${players.length ? ":" : "."} ${playerNames.join(", ")}
`.trim()
    );
  }
}
