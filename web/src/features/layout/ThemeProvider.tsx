import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { useStores } from "../../hooks";

export const ThemeProvider: React.FC<React.PropsWithChildren> = observer(
  ({ children }) => {
    const { settingsStore } = useStores();

    const theme = responsiveFontSizes(
      createTheme({
        typography: {
          fontFamily: "Open Sans",
          caption: {
            fontSize: "14px",
          },
        },
        palette: {
          mode: settingsStore.get("theme"),
        },
      })
    );

    document.body.style.background = theme.palette.background.default;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }
);
