import { Grid, Typography, styled } from "@mui/material";
import React from "react";

import { sortBy } from "lodash";
import { FileAddressBar } from "./FileAddressBar";
import { FileListBrowser, FileListBrowserProps } from "./FileListBrowser";
import { FileListItemCallbacks } from "./FileListItem";
import { FileTree } from "./FileTree";
import {
  FileTreeEntry,
  getFileEntryAt,
  sortFileEntries,
} from "./FileTreeEntry";

const TitleBoxGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderTopLeftRadius: "50%",
  borderTopRightRadius: "50%",
  paddingTop: "1em",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
})) as typeof Grid;

export type FileBrowserProps = FileListItemCallbacks &
  Pick<FileListBrowserProps, "content"> & {
    dir: string;
    root: FileTreeEntry;
    onExpand: (value: string) => void;
    onUploadStart: (file: File) => void;
  };

export const FileBrowser: React.FC<FileBrowserProps> = ({
  dir,
  root,
  onExpand,
  onUploadStart,
  onDirChange,
  ...browserProps
}) => {
  const entry = getFileEntryAt(root, dir, false);
  const entries =
    entry?.fetched &&
    entry?.type !== "series" &&
    entry.children.toSorted(sortFileEntries);

  return (
    <Grid container marginTop="1em">
      <Grid item xs={12}>
        <Grid container>
          <TitleBoxGrid item md={3} xl={2}>
            <Typography variant="h5" textAlign="center">
              Rex Media
            </Typography>
          </TitleBoxGrid>
          <Grid item flexGrow={1}>
            <FileAddressBar dir={dir} onChange={onDirChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={3} xl={2}>
            <FileTree
              dir={dir}
              entry={root}
              onExpand={onExpand}
              onDirChange={onDirChange}
            />
          </Grid>
          <Grid item flexGrow={1}>
            {entries && (
              <FileListBrowser
                entries={entries}
                onDirChange={onDirChange}
                onUploadStart={onUploadStart}
                {...browserProps}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
