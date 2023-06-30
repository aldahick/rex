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

const NoHoverLink = styled(Link)({
  "&:hover": {
    textDecoration: "none",
  },
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
          <NoHoverLink component={RouterLink} to="/" color="inherit">
            Alex Hicks
          </NoHoverLink>
        </Title>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ThemeSelect />
            </Grid>
            {!authStore.isAuthenticated && (
              <Grid item>
                <Button color="secondary" variant="outlined">
                  <NoHoverLink
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    style={{ fontWeight: 600 }}
                  >
                    Log In
                  </NoHoverLink>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
