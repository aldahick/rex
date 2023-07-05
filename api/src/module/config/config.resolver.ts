import { resolveQuery, resolver } from "@athenajs/core";

import { RexConfig } from "../../config.js";
import { IQuery } from "../../graphql.js";

@resolver()
export class ConfigResolver {
  constructor(private readonly config: RexConfig) {}
  @resolveQuery("config")
  async fetch(): Promise<IQuery["config"]> {
    return {
      createAnonymousUsers: this.config.userRegistration,
    };
  }
}
