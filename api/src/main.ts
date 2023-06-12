import "reflect-metadata";
import "./module/auth/index.js";
import "./module/generic/index.js";
import "./module/media/index.js";
import "./module/note/index.js";
import "./module/progress/index.js";
import "./module/role/index.js";
import "./module/steam/index.js";
import "./module/user/index.js";

import { createApp } from "@athenajs/core";

const main = async (): Promise<void> => {
  const app = createApp();
  await app.start();
};

await main();
