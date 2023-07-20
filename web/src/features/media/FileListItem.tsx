import FolderIcon from "@mui/icons-material/Folder";
import { Grid, styled, Typography } from "@mui/material";
import React from "react";

import { FileTreeEntry } from "./FileTreeEntry";

const PathTypography = styled(Typography)({
  fontSize: 18,
  marginLeft: "1em",
}) as typeof Typography;

export interface FileListItemProps {
  entry: FileTreeEntry;
  onDirChange: (value: string) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  entry,
  onDirChange,
}) => {
  const handleClick = () => {
    onDirChange(entry.path ?? "");
  };

  return (
    <Grid
      container
      alignItems="center"
      onClick={handleClick}
      sx={entry.type === "directory" ? { cursor: "pointer" } : {}}
    >
      {entry.type === "directory" ? <FolderIcon /> : null}
      <PathTypography>{entry.path?.split("/").slice(-1)[0]}</PathTypography>
    </Grid>
  );
};
