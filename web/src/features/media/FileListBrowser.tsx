import { Grid, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

import { FileListItem } from "./FileListItem";
import { FileTreeEntry, getDirAt } from "./FileTreeEntry";

const EntryGrid = styled(Grid)({
  margin: "0.25em",
}) as typeof Grid;

export interface FileListBrowserProps {
  dir: string;
  root: FileTreeEntry;
  onDirChange: (value: string) => void;
}

export const FileListBrowser: React.FC<FileListBrowserProps> = ({
  dir,
  root,
  onDirChange,
}) => {
  const [children, setChildren] = useState<FileTreeEntry[]>(root.children);

  useEffect(() => {
    if (!dir) {
      return setChildren(root.children);
    }
    const entry = getDirAt(root, dir, false);
    if (entry) {
      setChildren(entry.children);
    }
  }, [dir, root]);

  if (!children) {
    return null;
  }

  return (
    <Grid container paddingTop="1em" paddingLeft="2em">
      {children.map((entry) => (
        <EntryGrid item xs={12} key={entry.path ?? ""}>
          <FileListItem entry={entry} onDirChange={onDirChange} />
        </EntryGrid>
      ))}
    </Grid>
  );
};
