import { createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";

import { useStores } from "../../hooks";

export const ThemeProvider: React.FC = observer(({ children }) => {
  const { settingsStore } = useStores();

  const theme = responsiveFontSizes(createMuiTheme({
    typography: {
      fontFamily: "Open Sans",
      caption: {
        fontSize: "14px",
      },
    },
    palette: {
      type: settingsStore.get("theme"),
    },
  }));

  document.body.style.background = theme.palette.background.default;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
});
