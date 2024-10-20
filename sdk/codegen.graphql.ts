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
    "src/node.ts": {
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
    "src/react.ts": {
      documents: "gql/*.sdk.gql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        noExport: true,
      },
    },
  },
};
export default config;
