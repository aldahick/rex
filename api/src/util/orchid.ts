/*
This is the entrypoint for `pnpm db`, so it assumes very little and should not be imported by actual API code.
*/
import "reflect-metadata";

import { resolve as resolvePath } from "path";
import { pathToFileURL } from "url";
import { container } from "@athenajs/core";
import { rakeDb } from "rake-db";

import { RexConfig } from "../config.js";
import { BaseTable } from "../model/base.table.js";

const config = container.resolve(RexConfig);
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
  },
);
