import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { Grid, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";

import { config } from "../../config";
import { useStores } from "../../hooks";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";

const makeClient = (token: string | undefined) =>
  new ApolloClient({
    link: createHttpLink({
      uri: `${config.apiUrl}graphql`,
      headers: {
        authorization: token !== undefined ? `Bearer ${token}` : "",
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
    },
  });

export const Layout: React.FC<React.PropsWithChildren> = observer(
  ({ children }) => {
    const { authStore } = useStores();
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

    useEffect(() => {
      console.log("changing apollo client", authStore.token);
      setClient(makeClient(authStore.token));
    }, [authStore.token]);

    if (!client) {
      return null;
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <SnackbarProvider>
            <Navbar />
            <Sidebar />
            <Grid container justifyContent="center">
              <Toolbar />
              <Grid item width="100%">
                {children}
              </Grid>
            </Grid>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
);
