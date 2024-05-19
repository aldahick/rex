import { resolveQuery, resolver } from "@athenajs/core";
import { RexConfig } from "../../config.js";
import { IQuery } from "../../graphql.js";

@resolver()
export class ConfigResolver {
  constructor(private readonly config: RexConfig) {}

  @resolveQuery("config")
  fetch(): Promise<IQuery["config"]> {
    return Promise.resolve({
      createAnonymousUsers: this.config.userRegistration,
      mediaDataLimit: this.config.media.dataLimit,
    });
  }
}
