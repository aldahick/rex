import { Grid, styled } from "@mui/material";
import { sortBy } from "lodash";
import React, { useEffect, useState } from "react";

import { FileListItem, FileListItemCallbacks } from "./FileListItem";
import {
  FileTreeEntry,
  getFileEntryAt,
  sortFileEntries,
} from "./FileTreeEntry";
import { FileUploadArea } from "./FileUploadArea";

const RootGrid = styled(Grid)(({ theme }) => ({
  padding: "1em",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "1em",
  },
}));

const EntryGrid = styled(Grid)({
  margin: "0.25em",
}) as typeof Grid;

export interface FileListBrowserProps extends FileListItemCallbacks {
  dir: string;
  root: FileTreeEntry;
  content?: React.ReactNode;
  onUploadStart: (file: File) => void;
}

export const FileListBrowser: React.FC<FileListBrowserProps> = ({
  dir,
  root,
  content,
  onUploadStart,
  ...callbacks
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
    <RootGrid container paddingTop="1em" direction="column">
      {children.map((entry) => (
        <EntryGrid item key={entry.path ?? ""}>
          <FileListItem entry={entry} {...callbacks} />
        </EntryGrid>
      ))}
      <Grid item style={{ padding: "0.25em" }}>
        {content ?? <FileUploadArea onStart={onUploadStart} />}
      </Grid>
    </RootGrid>
  );
};
