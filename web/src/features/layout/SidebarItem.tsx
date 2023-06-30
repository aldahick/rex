import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { useStores } from "../../hooks";

export const SidebarItem: React.FC<{
  title: string | JSX.Element;
  url: string;
  icon?: JSX.Element;
  nested: boolean;
}> = ({ title, url, icon, nested }) => {
  const { sidebarStore } = useStores();
  const theme = useTheme();

  const handleClick = () => {
    sidebarStore.setOpen(false);
  };

  const style = nested ? { paddingLeft: theme.spacing(4) } : {};
  return (
    <ListItemButton
      component={Link}
      to={url}
      style={style}
      onClick={handleClick}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      {typeof title === "string" ? <ListItemText primary={title} /> : title}
    </ListItemButton>
  );
};
