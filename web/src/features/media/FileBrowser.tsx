import { Grid, styled, Typography } from "@mui/material";
import React from "react";

import { FileAddressBar } from "./FileAddressBar";
import { FileListBrowser } from "./FileListBrowser";
import { FileTree } from "./FileTree";
import { FileTreeEntry } from "./FileTreeEntry";

const TitleBoxGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderTopLeftRadius: "50%",
  borderTopRightRadius: "50%",
  paddingTop: "1em",
})) as typeof Grid;

export interface FileBrowserProps {
  dir: string;
  root: FileTreeEntry;
  onDelete: (entry: FileTreeEntry) => void;
  onDirChange: (value: string) => void;
  onExpand: (value: string) => void;
  onUploadStart: (file: File) => void;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({
  dir,
  root,
  onDelete,
  onDirChange,
  onExpand,
  onUploadStart,
}) => {
  return (
    <Grid container marginTop="1em">
      <Grid item xs={12}>
        <Grid container>
          <TitleBoxGrid item xs={4} md={3} xl={2}>
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
          <Grid item xs={4} md={3} xl={2}>
            <FileTree
              dir={dir}
              entry={root}
              onExpand={onExpand}
              onDirChange={onDirChange}
            />
          </Grid>
          <Grid item flexGrow={1}>
            {root.fetched ? (
              <FileListBrowser
                dir={dir}
                root={root}
                onDelete={onDelete}
                onDirChange={onDirChange}
                onUploadStart={onUploadStart}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
