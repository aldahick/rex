import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../gql/*.gql",
  config: {
    maybeValue: "T | undefined",
    typesPrefix: "I",
    scalars: {
      DateTime: "Date",
      Upload: "File",
    },
  },
  hooks: {
    afterAllFileWrite: "biome check --apply-unsafe",
  },
  generates: {
    "src/graphql.ts": {
      documents: "./src/**/*.gql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};
export default config;
