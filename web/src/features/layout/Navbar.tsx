import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Link,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useStores } from "../../hooks";
import { ThemeSelect } from "./ThemeSelect";

const Title = styled(Typography)({
  fontWeight: 600,
  marginLeft: "1em",
  flexGrow: 1,
});

export const Navbar: React.FC = observer(() => {
  const { authStore, sidebarStore } = useStores();

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
              <ThemeSelect />
            </Grid>
            {!authStore.isAuthenticated && (
              <Grid item>
                <Button color="secondary" variant="outlined">
                  <Link
                    component={RouterLink}
                    to="/login"
                    style={{
                      fontWeight: 600,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Log In
                  </Link>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
