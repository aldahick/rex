import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../gql/*.gql",
  config: {
    maybeValue: "T | undefined",
    typesPrefix: "I",
    scalars: {
      DateTime: "Date",
    },
  },
  hooks: {
    afterAllFileWrite: "biome check --write --unsafe",
  },
  generates: {
    "src/graphql.sdk.ts": {
      documents: "gql/*.sdk.gql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        gqlImport: "graphql-request#gql",
      },
    },
  },
};
export default config;
