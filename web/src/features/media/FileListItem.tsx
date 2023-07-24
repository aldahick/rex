import AudioIcon from "@mui/icons-material/AudioFile";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import VideoIcon from "@mui/icons-material/VideoFile";
import { Grid, IconButton, styled, Typography } from "@mui/material";
import mime from "mime";
import React, { useState } from "react";

import { FileTreeEntry } from "./FileTreeEntry";

export const PathTypography = styled(Typography)({
  fontSize: 18,
  marginLeft: "1em",
}) as typeof Typography;

const IconPlaceholder = styled("div")({ minWidth: "24px" });

export const getFileListItemIcon = (
  entry: Pick<FileTreeEntry, "path" | "type">,
) => {
  if (entry.type === "directory" || !entry.path) {
    return FolderIcon;
  }
  const type = mime.getType(entry.path);
  if (type?.startsWith("image/")) {
    return ImageIcon;
  } else if (type?.startsWith("audio/")) {
    return AudioIcon;
  } else if (type?.startsWith("video/")) {
    return VideoIcon;
  }
  return IconPlaceholder;
};

export interface FileListItemProps {
  entry: FileTreeEntry;
  onDelete: (entry: FileTreeEntry) => void;
  onDirChange: (value: string) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  entry,
  onDelete,
  onDirChange,
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    onDirChange(entry.path ?? "");
  };
  const handleDelete = () => {
    onDelete(entry);
  };
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const Icon = getFileListItemIcon(entry);

  return (
    <Grid
      container
      alignItems="center"
      sx={entry.type === "directory" ? { cursor: "pointer" } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon onClick={handleClick} />
      <PathTypography onClick={handleClick}>
        {entry.path?.split("/").slice(-1)[0]}
      </PathTypography>
      <Grid item flexGrow={1} onClick={handleClick} />
      <IconButton onClick={handleDelete} style={hover ? {} : { opacity: 0 }}>
        <DeleteIcon color="error" />
      </IconButton>
    </Grid>
  );
};
