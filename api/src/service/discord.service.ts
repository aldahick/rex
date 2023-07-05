import { injectable, Logger, makeRegistryDecorator } from "@athenajs/core";
import { injectAll } from "@athenajs/core/dist/container.js";
import { Client, GatewayIntentBits, Message } from "discord.js";

import { RexConfig } from "../config.js";

const commandToken = Symbol("DiscordCommand");

export interface DiscordCommand {
  command: string | string[];
  helpText: string;

  handle(
    message: Message,
    args: string[],
    command: string
  ): Promise<void | undefined | string>;
}
export const discordCommand = makeRegistryDecorator(commandToken);

export interface DiscordPayload {
  /** provided for convenience, to avoid reconstructing with prefix for usage errors */
  command: string;
  args: string[];
  message: Message;
}

@injectable()
export class DiscordService {
  readonly client = new Client({
    intents: [GatewayIntentBits.GuildMessages],
  });

  readonly commands = new Map<string, DiscordCommand>();

  constructor(
    private readonly config: RexConfig,
    private readonly logger: Logger,
    @injectAll(commandToken) commands: DiscordCommand[]
  ) {
    for (const handler of commands) {
      const commands = Array.isArray(handler.command)
        ? handler.command
        : [handler.command];
      for (const command of commands) {
        this.commands.set(command.toLowerCase(), handler);
      }
    }
    this.init().catch((err) => {
      this.logger.error("failed to start Discord bot: " + err);
    });
  }

  async init(): Promise<void> {
    if (this.config.discord.token === undefined) {
      return;
    }
    this.client.on("message", (m) => this.onMessage(m));
    await this.client.login(this.config.discord.token);
    this.logger.info("discord.connected");
  }

  close(): void {
    if (this.config.discord.token === undefined) {
      return;
    }
    this.client.destroy();
    this.logger.info("discord.disconnected");
  }

  private onMessage(message: Message): void {
    const { author, content } = message;
    if (!content.startsWith(this.config.discord.commandPrefix)) {
      // ignore non-commands
      return;
    }
    if (author.bot) {
      // ignore bot messages
      return;
    }
    const [command, ...args] = content
      .slice(this.config.discord.commandPrefix.length)
      .split(" ");
    const handler = command && this.commands.get(command);
    if (!handler) {
      return;
    }
    handler
      .handle(message, args, command)
      .then(async (reply) => {
        if (reply) {
          await message.reply(reply);
        }
      })
      .catch(async (err) => {
        this.logger.error(
          `uncaught error in discord command ${command}: ${err}`
        );
        await message.reply("sorry, an internal error occurred");
      });
  }
}
