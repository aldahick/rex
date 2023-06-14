import { ApolloProvider } from "@apollo/client";
import { Grid, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { SnackbarProvider } from "notistack";
import React from "react";

import { useStores } from "../../hooks";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";

export const Layout: React.FC<React.PropsWithChildren> = observer(
  ({ children }) => {
    const { apolloStore } = useStores();
    return (
      <ApolloProvider client={apolloStore.client}>
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
