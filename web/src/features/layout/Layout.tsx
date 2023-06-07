import { ApolloProvider } from "@apollo/client";
import { Grid, makeStyles, Toolbar } from "@material-ui/core";
import { observer } from "mobx-react";
import { SnackbarProvider } from "notistack";
import React from "react";

import { useStores } from "../../hooks";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";

const useStyles = makeStyles({
  content: {
    width: "100%"
  },
});

export const Layout: React.FC = observer(({ children }) => {
  const { apolloStore } = useStores();
  const classes = useStyles();

  return (
    <ApolloProvider client={apolloStore.client}>
      <ThemeProvider>
        <SnackbarProvider>
          <Navbar />
          <Sidebar />
          <Grid container justify="center">
            <Toolbar />
            <Grid item className={classes.content}>
              {children}
            </Grid>
          </Grid>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
});
