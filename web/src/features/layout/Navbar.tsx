import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Grid,
  IconButton,
  Link,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { useStores } from "../../hooks";
import { LoginButton } from "../auth/LoginButton";
import { ThemeSelect } from "./ThemeSelect";

const Title = styled(Typography)({
  fontWeight: 600,
  marginLeft: "1em",
  flexGrow: 1,
});

export const Navbar: React.FC = observer(() => {
  const { authStore, sidebarStore } = useStores();
  const location = useLocation();

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => sidebarStore.setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Title variant="h6" color="inherit">
          <Link
            component={RouterLink}
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Alex Hicks
          </Link>
        </Title>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ThemeSelect type="button" />
            </Grid>
            {!authStore.isAuthenticated && location.pathname !== "/login" && (
              <Grid item>
                <LoginButton />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
