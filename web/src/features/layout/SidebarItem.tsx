import {
  ListItem, ListItemIcon, ListItemText, makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { useStores } from "../../hooks";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const SidebarItem: React.FC<{
  title: string | JSX.Element;
  url: string;
  icon?: JSX.Element;
  nested: boolean;
}> = ({
  title, url, icon, nested,
}) => {
  const { sidebarStore } = useStores();
  const classes = useStyles();

  return (
    <ListItem
      button
      component={Link}
      to={url}
      className={nested ? classes.nested : undefined}
      onClick={() => sidebarStore.setOpen(false)}
    >
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      {typeof title === "string"
        ? <ListItemText primary={title} />
        : title}
    </ListItem>
  );
};
