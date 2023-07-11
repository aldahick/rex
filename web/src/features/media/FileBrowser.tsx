import { Grid } from "@mui/material";
import React from "react";

import { FileTree, FileTreeEntry } from "./FileTree";

export interface FileBrowserProps {
  root: FileTreeEntry;
}

export const FileBrowser: React.FC<{
  root: FileTreeEntry;
}> = ({ root }) => {
  return (
    <Grid container>
      <Grid item xs={4} md={3} lg={2}>
        <FileTree entry={root} />
      </Grid>
      <Grid item flexGrow={1}></Grid>
    </Grid>
  );
};
