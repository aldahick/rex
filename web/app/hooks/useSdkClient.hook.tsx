import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { config } from "../config";
import { useAuth } from "./useAuth.hook";
import { StatusDispatchers, useStatus } from "./useStatus.hook";

export const getApolloClient = (
  status: StatusDispatchers,
  authToken?: string,
) => {
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    console.log(`GraphQL request ${operation.operationName} failed`, {
      graphQLErrors,
      networkError,
    });
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        status.danger(error.message);
      }
    }
    if (networkError) {
      status.danger(networkError.message);
    }
  });

  const httpLink = new HttpLink({
    uri: `${config.apiUrl}/graphql`,
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
};

export const useSdkClient = () => {
  const auth = useAuth();
  const status = useStatus();
  const client = useMemo(
    () => getApolloClient(status, auth.token?.token),
    [auth.token],
  );
  return client;
};
