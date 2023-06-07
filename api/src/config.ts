import { BaseConfig, config } from "@athenajs/core";

@config()
export class Config extends BaseConfig {
  readonly discord = {
    commandPrefix: this.optional("DISCORD_COMMAND_PREFIX") ?? "~",
    token: this.optional("DISCORD_TOKEN"),
  };

  readonly graphqlSchemaDirs = this.required("GRAPHQL_SCHEMA_DIRS").split(",");

  readonly googleAuth = {
    clientIds: {
      mobile: this.optional("GOOGLE_CLIENT_ID_MOBILE"),
      web: this.optional("GOOGLE_CLIENT_ID_WEB"),
    },
  };

  readonly http = {
    port: Number(this.required("HTTP_PORT")),
  };

  readonly mediaDir = this.optional("MEDIA_DIR");

  readonly redisUrl = this.optional("REDIS_URL");

  readonly postgresUrl = this.required("POSTGRES_URL");

  readonly steamApiKey = this.optional("STEAM_API_KEY");
}
