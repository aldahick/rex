import "reflect-metadata";

import { container } from "@athenajs/core";
import { resolve as resolvePath } from "path";
import { rakeDb } from "rake-db";
import { pathToFileURL } from "url";

import { Config } from "../config.js";
import { BaseTable } from "../model/base.table.js";

const config = container.resolve(Config);
export const change = rakeDb(
  {
    databaseURL: config.postgresUrl,
  },
  {
    baseTable: BaseTable,
    migrationsTable: "migrations",
    migrationsPath: "../migrations",
    useCodeUpdater: false,
    import: (path) => import(pathToFileURL(resolvePath(path)).toString()),
  }
);
