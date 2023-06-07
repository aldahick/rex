import "reflect-metadata";
import "./module/auth/index.js";
import "./module/generic/index.js";
import "./module/league/index.js";
import "./module/media/index.js";
import "./module/note/index.js";
import "./module/progress/index.js";
import "./module/role/index.js";
import "./module/steam/index.js";
import "./module/user/index.js";

import { container, createApp } from "@athenajs/core";

import { DiscordRegistry } from "./registry/discord/index.js";
import { DatabaseService } from "./service/database/index.js";

const main = async (): Promise<void> => {
  const app = createApp();
  const discordRegistry = container.resolve(DiscordRegistry);
  await discordRegistry.init();
  // TODO on server close, stop discord bot

  const db = container.resolve(DatabaseService);
  await db.init();

  await app.start();
};

await main();
