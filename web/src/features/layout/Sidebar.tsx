import {
  IconButton,
  List,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import * as _ from "lodash";
import { observer } from "mobx-react";
import React from "react";

import { useStores } from "../../hooks";
import * as features from "..";
import { LogoutButton } from "../auth/components/LogoutButton";
import { SidebarItem } from "./SidebarItem";

const DRAWER_WIDTH = 250;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  fixedDrawer: {
    width: DRAWER_WIDTH,
  },
  openButton: {
    position: "fixed",
    left: "0",
    top: "0",
  },
  openButtonIcon: {
    backgroundColor: "lightgray",
    border: "1px solid lightgray",
    borderRadius: "50%",
  },
}));

export const Sidebar: React.FC = observer(() => {
  const { authStore, sidebarStore } = useStores();
  const classes = useStyles();
  const pages = _.sortBy(
    _.flatten(Object.values(features).map(f => f.pages ?? [])),
    p => p.navbar?.title,
    p => p.route
  );

  return (
    <nav className={classes.drawer}>
      <SwipeableDrawer
        variant="temporary"
        anchor="left"
        open={sidebarStore.isOpen}
        onClose={() => sidebarStore.setOpen(false)}
        onOpen={() => sidebarStore.setOpen(true)}
      >
        <div style={{ width: 250 }}>
          <List>
            {!authStore.isAuthenticated && (
              <SidebarItem title="Log In" url="/login" nested={false} />
            )}
            {pages.filter(
              ({ navbar, permissions }) => !!navbar && (
                permissions?.every(p => authStore.isAuthorized(p)) ?? true
              ),
            ).map(page => (
              <SidebarItem
                key={page.route}
                url={page.route}
                title={page.navbar?.title ?? "UNKNOWN PAGE"}
                nested={false}
              />
            ))}
            {authStore.isAuthenticated && <LogoutButton />}
          </List>
        </div>
      </SwipeableDrawer>
      <IconButton
        size="medium"
        className={classes.openButton}
        onClick={() => sidebarStore.setOpen(true)}
      >
        <ChevronRightIcon className={classes.openButtonIcon} />
      </IconButton>
    </nav>
  );
});
