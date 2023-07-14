import { Grid } from "@mui/material";
import React from "react";

import { FileTree, FileTreeEntry } from "./FileTree";

export interface FileBrowserProps {
  dir: string;
  root: FileTreeEntry;
  onExpand: (value: string) => void;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({ root, onExpand }) => {
  return (
    <Grid container>
      <Grid item xs={4} md={3} lg={2}>
        <FileTree entry={root} onExpand={onExpand} />
      </Grid>
      <Grid item flexGrow={1}></Grid>
    </Grid>
  );
};
