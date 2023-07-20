import FolderIcon from "@mui/icons-material/Folder";
import ExpandCloseIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandOpenIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { FileTreeEntry } from "./FileTreeEntry";

const CenteredListItemIcon = styled(ListItemIcon)({
  justifyContent: "center",
});

export interface FileTreeProps {
  dir: string;
  entry: FileTreeEntry;
  onDirChange: (value: string) => void;
  onExpand: (value: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({
  dir,
  entry,
  onDirChange,
  onExpand,
}) => {
  const [open, setOpen] = useState(!entry.path);

  useEffect(() => {
    if (entry.path && dir.startsWith(entry.path) && !entry.fetched) {
      setOpen(true);
      onExpand(entry.path);
    }
  }, [dir]);

  const dirChildren = entry.children.filter((c) => c.type === "directory");

  const handleExpand = () => {
    if (!entry.path) {
      return;
    }
    setOpen((prev) => !prev);
    if (entry.fetched && !dirChildren.length) {
      return;
    }
    onExpand(entry.path ?? "");
  };

  const handleTextClick = () => {
    onDirChange(entry.path ?? "");
  };

  const ExpandIcon = open ? ExpandCloseIcon : ExpandOpenIcon;
  const label = entry.path?.split("/").slice(-1)[0] ?? "Root";

  return (
    <>
      <ListItemButton
        sx={entry.path ? { pl: entry.path.split("/").length * 4 } : {}}
        selected={dir === (entry.path ?? "")}
      >
        <ExpandIcon onClick={handleExpand} />
        <CenteredListItemIcon onClick={handleExpand}>
          <FolderIcon />
        </CenteredListItemIcon>
        <ListItemText primary={label} onClick={handleTextClick} />
      </ListItemButton>
      {dirChildren.length ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {dirChildren.map((entry) => (
              <FileTree
                key={entry.path}
                dir={dir}
                entry={entry}
                onDirChange={onDirChange}
                onExpand={onExpand}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
