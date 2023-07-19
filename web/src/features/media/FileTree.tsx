import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useState } from "react";

const CenteredListItemIcon = styled(ListItemIcon)({
  justifyContent: "center",
});

export interface FileTreeEntry {
  /** If undefined, this is the root entry. Does NOT start with "/" */
  path?: string;
  fetched: boolean;
  type: "file" | "directory";
  children: FileTreeEntry[];
}

/**
 * Creates directory parents for path if none exist
 */
export const getDirAt = (root: FileTreeEntry, path: string): FileTreeEntry => {
  if (path === "") {
    return root;
  }
  const parts = path.split("/");
  let current = root;
  for (const part of parts) {
    let next = current.children.find((e) => e.path === part);
    console.log({ current, part, next });
    if (!next) {
      next = { type: "directory", children: [], fetched: false };
      current.children.push(next);
    }
    current = next;
  }
  return current;
};

export interface FileTreeProps {
  entry: FileTreeEntry;
  onExpand: (value: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ entry, onExpand }) => {
  const [open, setOpen] = useState(!entry.path);

  const dirChildren = entry.children.filter((c) => c.type === "directory");

  const handleExpand = () => {
    if (!entry.path || (entry.fetched && !dirChildren.length)) {
      return;
    }
    setOpen((prev) => !prev);
    onExpand(entry.path ?? "");
  };

  const ExpandIcon = open ? ExpandMore : ExpandLess;
  const label = entry.path?.split("/").slice(-1) ?? "Root";

  return (
    <>
      <ListItemButton
        sx={entry.path ? { pl: entry.path.split("/").length * 4 } : {}}
        onClick={handleExpand}
      >
        {entry.children.length || !entry.fetched ? <ExpandIcon /> : null}
        <CenteredListItemIcon>
          <FolderIcon />
        </CenteredListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
      {dirChildren.length ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {dirChildren.map((entry) => (
              <FileTree key={entry.path} entry={entry} onExpand={onExpand} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
