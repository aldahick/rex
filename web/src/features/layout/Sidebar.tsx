import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  IconButton,
  List,
  styled,
  SwipeableDrawer,
  Theme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { IAuthPermission } from "../../graphql";
import { useStores } from "../../hooks";
import { LogoutButton } from "../auth/LogoutButton";
import { SidebarItem } from "./SidebarItem";

const DRAWER_WIDTH = 250;

const Nav = styled("nav")((theme: Theme) => ({
  [theme.breakpoints.up("sm")]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
}));

const InnerDrawer = styled("div")({
  width: DRAWER_WIDTH,
});

const OpenButton = styled(IconButton)({
  position: "fixed",
  left: "0",
  top: "0",
});

const OpenButtonIcon = styled(ChevronRightIcon)({
  backgroundColor: "lightgray",
  border: "1px solid lightgray",
  borderRadius: "50%",
});

interface SidebarLink {
  label: string;
  route: string;
  permissions?: IAuthPermission[];
}

const sidebarLinks: SidebarLink[] = [
  {
    label: "Cat Game",
    route: "/cat",
  },
];

export const Sidebar: React.FC = observer(() => {
  const { authStore, sidebarStore } = useStores();

  const handleOpen = () => sidebarStore.setOpen(true);
  const handleClose = () => sidebarStore.setOpen(false);

  return (
    <Nav>
      <SwipeableDrawer
        variant="temporary"
        anchor="left"
        open={sidebarStore.isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <InnerDrawer>
          <List>
            {!authStore.isAuthenticated && (
              <SidebarItem title="Log In" url="/login" nested={false} />
            )}
            {sidebarLinks
              .filter(
                ({ permissions }) =>
                  !permissions ||
                  permissions.every((p) => authStore.isAuthorized(p))
              )
              .map((page) => (
                <SidebarItem
                  key={page.route}
                  url={page.route}
                  title={page.label}
                  nested={false}
                />
              ))}
            {authStore.isAuthenticated && <LogoutButton />}
          </List>
        </InnerDrawer>
      </SwipeableDrawer>
      <OpenButton size="medium" onClick={handleOpen}>
        <OpenButtonIcon />
      </OpenButton>
    </Nav>
  );
});
