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
export const getDirAt = (
  root: FileTreeEntry,
  fullDir: string,
): FileTreeEntry => {
  if (fullDir === "") {
    return root;
  }
  const parts = fullDir.split("/");
  let current = root;
  const prefix = root.path ? `${root.path}/` : "";
  parts.forEach((part, index) => {
    let next = current.children.find(
      (e) => e.path === part || e.path?.endsWith("/" + part),
    );
    if (!next) {
      const path = prefix + parts.slice(0, index + 1).join("/");
      next = { type: "directory", children: [], fetched: false, path };
      current.children.push(next);
    }
    current = next;
  });
  return current;
};

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

  const ExpandIcon = open ? ExpandCloseIcon : ExpandOpenIcon;
  const label = entry.path?.split("/").slice(-1) ?? "Root";

  return (
    <>
      <ListItemButton
        sx={entry.path ? { pl: entry.path.split("/").length * 4 } : {}}
        onClick={handleExpand}
        selected={dir === (entry.path ?? "")}
      >
        <ExpandIcon />
        <CenteredListItemIcon>
          <FolderIcon />
        </CenteredListItemIcon>
        <ListItemText primary={label} />
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
