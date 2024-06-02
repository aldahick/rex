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
    cloud: {
      projectId: this.optional("GOOGLE_CLOUD_PROJECT_ID"),
      credentialsPath: this.optional("GOOGLE_CLOUD_CREDENTIALS_PATH"),
    },
    oauth: {
      mobile: {
        clientId: this.optional("GOOGLE_CLIENT_ID_MOBILE"),
        clientSecret: this.optional("GOOGLE_CLIENT_SECRET_MOBILE"),
      },
      web: {
        clientId: this.optional("GOOGLE_CLIENT_ID_WEB"),
        clientSecret: this.optional("GOOGLE_CLIENT_SECRET_WEB"),
      },
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

  readonly mzk = {
    runner: {
      dir: this.optional("MZK_RUNNER_DIR"),
      image: this.optional("MZK_RUNNER_IMAGE"),
      platform: this.required("MZK_RUNNER_PLATFORM"),
    },
  };

  readonly postgresUrl = this.required("POSTGRES_URL");

  readonly redisUrl = this.required("REDIS_URL");

  readonly steamApiKey = this.optional("STEAM_API_KEY");

  readonly userRegistration = !!this.optional("USER_REGISTRATION");
}
