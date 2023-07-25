import AudioIcon from "@mui/icons-material/AudioFile";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
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

export const getFileEntryType = (
  entry: Pick<FileTreeEntry, "path" | "type">,
): [typeof IconPlaceholder | typeof ImageIcon, string | undefined] => {
  if (entry.type === "directory" || !entry.path) {
    return [FolderIcon, undefined];
  }
  const type = mime.getType(entry.path);
  if (type?.startsWith("image/")) {
    return [ImageIcon, type];
  } else if (type?.startsWith("audio/")) {
    return [AudioIcon, type];
  } else if (type?.startsWith("video/")) {
    return [VideoIcon, type];
  }
  return [IconPlaceholder, type ?? undefined];
};

export interface FileListItemCallbacks {
  onDelete: (entry: FileTreeEntry) => void;
  onDirChange: (value: string) => void;
  onTranscribe: (entry: FileTreeEntry) => void;
}

export interface FileListItemProps extends FileListItemCallbacks {
  entry: FileTreeEntry;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  entry,
  onDelete,
  onDirChange,
  onTranscribe,
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
  const handleTranscribe = () => {
    onTranscribe(entry);
  };

  const [Icon, type] = getFileEntryType(entry);

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
      <Grid item style={hover ? {} : { opacity: 0 }}>
        {type?.startsWith("audio/") ? (
          <IconButton onClick={handleTranscribe}>
            <MusicNoteIcon />
          </IconButton>
        ) : null}
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
