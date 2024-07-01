import { BaseConfig, config } from "@athenajs/core";
import { stringToBytes } from "./util/byte.js";

@config()
export class RexConfig extends BaseConfig {
  readonly dockerSocketPath = this.optional("DOCKER_SOCKET_PATH");

  readonly discord = {
    commandPrefix: this.optional("DISCORD_COMMAND_PREFIX") ?? "~",
    token: this.optional("DISCORD_TOKEN"),
  };

  readonly graphqlSchemaDirs = this.required("GRAPHQL_SCHEMA_DIRS").split(",");

  readonly google = {
    oauth: {
      clientId: this.optional("GOOGLE_CLIENT_ID"),
      clientSecret: this.optional("GOOGLE_CLIENT_SECRET"),
    },
  };

  readonly http = {
    host: this.optional("HTTP_HOST") || undefined,
    jwtKey: this.required("HTTP_JWT_KEY"),
    port: Number(this.required("HTTP_PORT")),
    url: this.required("HTTP_URL"),
  };

  readonly log = {
    database: this.optional("LOG_DATABASE") === "true",
    level: this.optional("LOG_LEVEL") ?? "debug",
    pretty: !!this.optional("LOG_PRETTY"),
  };

  readonly media = {
    dataLimit: stringToBytes(this.optional("MEDIA_DATA_LIMIT")),
    dir: this.optional("MEDIA_DIR"),
    sharexUrl:
      this.optional("MEDIA_SHAREX_URL") ?? `${this.http.url}/v1/sharex`,
  };

  readonly postgresUrl = this.required("POSTGRES_URL");

  readonly redisUrl = this.required("REDIS_URL");

  readonly steamApiKey = this.optional("STEAM_API_KEY");

  readonly userRegistration = !!this.optional("USER_REGISTRATION");
}
