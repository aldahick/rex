import { Grid, styled } from "@mui/material";
import { sortBy } from "lodash";
import React, { useEffect, useState } from "react";

import { FileListItem } from "./FileListItem";
import {
  FileTreeEntry,
  getFileEntryAt,
  sortFileEntries,
} from "./FileTreeEntry";
import { FileUploadArea } from "./FileUploadArea";

const EntryGrid = styled(Grid)({
  margin: "0.25em",
}) as typeof Grid;

export interface FileListBrowserProps {
  dir: string;
  root: FileTreeEntry;
  onDelete: (entry: FileTreeEntry) => void;
  onDirChange: (value: string) => void;
  onUploadStart: (file: File) => void;
}

export const FileListBrowser: React.FC<FileListBrowserProps> = ({
  dir,
  root,
  onDelete,
  onDirChange,
  onUploadStart,
}) => {
  const [children, setChildren] = useState<FileTreeEntry[]>(
    sortBy(root.children, sortFileEntries),
  );

  useEffect(() => {
    if (!dir) {
      return setChildren(sortBy(root.children, sortFileEntries));
    }
    const entry = getFileEntryAt(root, dir, false);
    if (entry) {
      setChildren(sortBy(entry.children, sortFileEntries));
    }
  }, [dir, root]);

  if (!children) {
    return null;
  }

  return (
    <Grid container paddingTop="1em" paddingLeft="2em" direction="column">
      {children.map((entry) => (
        <EntryGrid item key={entry.path ?? ""}>
          <FileListItem
            entry={entry}
            onDirChange={onDirChange}
            onDelete={onDelete}
          />
        </EntryGrid>
      ))}
      <Grid item style={{ padding: "0.25em" }}>
        <FileUploadArea onStart={onUploadStart} />
      </Grid>
    </Grid>
  );
};
