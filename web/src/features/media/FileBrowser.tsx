import { Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";

import { FileAddressBar } from "./FileAddressBar";
import { FileTree, FileTreeEntry } from "./FileTree";

const TitleBoxGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderTopLeftRadius: "50%",
  borderTopRightRadius: "50%",
  paddingTop: "1em",
})) as typeof Grid;

export interface FileBrowserProps {
  dir: string;
  root: FileTreeEntry;
  onExpand: (value: string) => void;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({ root, onExpand }) => {
  const [currentDir, setCurrentDir] = useState("");

  const handleDirChange = (newDir: string) => {
    setCurrentDir(newDir);
  };

  return (
    <Grid container marginTop="1em">
      <Grid item xs={12}>
        <Grid container>
          <TitleBoxGrid item xs={4} md={3} lg={2}>
            <Typography variant="h5" textAlign="center">
              Rex Media
            </Typography>
          </TitleBoxGrid>
          <Grid item flexGrow={1}>
            <FileAddressBar dir={currentDir} onChange={handleDirChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={4} md={3} lg={2}>
          <FileTree
            dir={currentDir}
            entry={root}
            onExpand={onExpand}
            onDirChange={handleDirChange}
          />
        </Grid>
        <Grid item flexGrow={1}></Grid>
      </Grid>
    </Grid>
  );
};
