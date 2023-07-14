import { RexConfig } from "../../config.js";
import {
  DiscordCommand,
  discordCommand,
  DiscordService,
} from "../../service/discord.service.js";

@discordCommand()
export class HelpCommand implements DiscordCommand {
  command = "help";
  helpText = "Don't read this one?";

  constructor(
    private readonly config: RexConfig,
    private readonly discordService: DiscordService,
  ) {}

  async handle(): Promise<string> {
    /*
    ends up like:
    **Commands:**
    `~a`, `~b`: this is help text
    `~c`: and this is more
    */
    return `**Commands:**\n${Array.from(this.discordService.commands.values())
      .map(
        ({ command, helpText }) =>
          `${(command instanceof Array ? command : [command])
            .map(
              (command) => `\`${this.config.discord.commandPrefix}${command}\``,
            )
            .join(", ")}: ${helpText}`,
      )
      .join("\n")}`;
  }
}
