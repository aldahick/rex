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

  readonly googleAuth = {
    clientIds: {
      mobile: this.optional("GOOGLE_CLIENT_ID_MOBILE"),
      web: this.optional("GOOGLE_CLIENT_ID_WEB"),
    },
  };

  readonly googleCloud = {
    projectId: this.optional("GOOGLE_CLOUD_PROJECT_ID"),
    credentialsPath: this.optional("GOOGLE_CLOUD_CREDENTIALS_PATH"),
  };

  readonly http = {
    host: this.optional("HTTP_HOST") || undefined,
    jwtKey: this.required("HTTP_JWT_KEY"),
    port: Number(this.required("HTTP_PORT")),
    url: this.required("HTTP_URL"),
  };

  readonly media = {
    dataLimit: stringToBytes(this.optional("MEDIA_DATA_LIMIT")),
    dir: this.optional("MEDIA_DIR"),
  };

  readonly mzk = {
    runner: {
      dir: this.optional("MZK_RUNNER_DIR"),
      image: this.required("MZK_RUNNER_IMAGE"),
      platform: this.required("MZK_RUNNER_PLATFORM"),
    },
  };

  readonly postgresUrl = this.required("POSTGRES_URL");

  readonly steamApiKey = this.optional("STEAM_API_KEY");

  readonly userRegistration = !!this.optional("USER_REGISTRATION");
}
