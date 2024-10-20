import { GraphQLClient } from "graphql-request";
import { getSdk } from "./node.js";

export * from "./node.js";

export type RexSdk = ReturnType<typeof getSdk>;

export interface RexSdkOptions {
  graphqlUrl: string;
  config?: GraphQLClient["requestConfig"];
}

export const getBaseRexSdk = ({ graphqlUrl, config }: RexSdkOptions): RexSdk =>
  getSdk(new GraphQLClient(graphqlUrl, config));
