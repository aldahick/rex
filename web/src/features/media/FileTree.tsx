import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

export interface FileTreeEntry {
  /** If undefined, this is the root entry. Does NOT start with "/" */
  path?: string;
  type: "file" | "directory";
  children: FileTreeEntry[];
}

export interface FileTreeProps {
  entry: FileTreeEntry;
}

export const FileTree: React.FC<FileTreeProps> = ({ entry }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const dirChildren = entry.children.filter((c) => c.type === "directory");

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={entry.path ?? "Root"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {dirChildren.map((entry) => (
          <FileTree key={entry.path} entry={entry} />
        ))}
      </Collapse>
    </>
  );
};
