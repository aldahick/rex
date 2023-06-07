import { AppBar, Button, Grid, IconButton, Link, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { observer } from "mobx-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useStores } from "../../hooks";
import { ThemeSelect } from "./ThemeSelect";

const useStyles = makeStyles({
  titleText: {
    fontWeight: 600,
    marginLeft: "1em",
    flexGrow: 1,
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
});

export const Navbar: React.FC = observer(() => {
  const { authStore, sidebarStore } = useStores();
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => sidebarStore.setOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.titleText}>
          <Link component={RouterLink} to="/" color="inherit" className={classes.link}>
            Alex Hicks
          </Link>
        </Typography>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ThemeSelect />
            </Grid>
            {!authStore.isAuthenticated && (
              <Grid item>
                <Button color="secondary" variant="outlined">
                  <Link component={RouterLink} to="/login" color="inherit" className={classes.link} style={{ fontWeight: 600 }}>
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
