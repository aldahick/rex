import "reflect-metadata";

import "./module/auth/auth.resolver.js";
import "./module/config/config.resolver.js";
import "./module/generic/datetime.resolver.js";
import "./module/media/media.resolver.js";
import "./module/media/sharex.controller.js";
import "./module/note/note.resolver.js";
import "./module/progress/progress.resolver.js";
import "./module/project/project.resolver.js";
import "./module/project/project-config.resolver.js";
import "./module/role/role.resolver.js";
import "./module/steam/steam.resolver.js";
import "./module/user/user.resolver.js";

import { createApp } from "@athenajs/core";

const main = async (): Promise<void> => {
  const app = createApp();
  await app.start();
};

await main();
