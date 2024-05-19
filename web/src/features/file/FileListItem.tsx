import AudioIcon from "@mui/icons-material/AudioFile";
import SeriesIcon from "@mui/icons-material/Collections";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideoIcon from "@mui/icons-material/VideoFile";
import { Grid, IconButton, Typography, styled } from "@mui/material";
import mime from "mime";
import React, { useState } from "react";
import { FileDeleteButton } from "./FileDeleteButton";
import { FileTreeEntry } from "./FileTreeEntry";

export const PathTypography = styled(Typography)({
  cursor: "pointer",
  marginLeft: "1em",
}) as typeof Typography;

const IconPlaceholder = styled("div")({ minWidth: "24px" });

export const getFileEntryType = (
  entry: Pick<FileTreeEntry, "path" | "type">,
): [typeof IconPlaceholder | typeof ImageIcon, string | undefined] => {
  if (entry.type === "directory" || !entry.path) {
    return [FolderIcon, undefined];
  }
  if (entry.type === "series") {
    return [SeriesIcon, undefined];
  }
  const type = mime.getType(entry.path);
  if (type?.startsWith("image/")) {
    return [ImageIcon, type];
  }
  if (type?.startsWith("audio/")) {
    return [AudioIcon, type];
  }
  if (type?.startsWith("video/")) {
    return [VideoIcon, type];
  }
  return [IconPlaceholder, type ?? undefined];
};

export interface FileListItemCallbacks {
  onDelete: (entry: FileTreeEntry) => void;
  onDirChange: (value: string) => void;
  onFileOpen: (entry: FileTreeEntry) => void;
  onTranscribe: (entry: FileTreeEntry) => void;
}

export interface FileListItemProps extends FileListItemCallbacks {
  entry: FileTreeEntry;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  entry,
  onDelete,
  onDirChange,
  onFileOpen,
  onTranscribe,
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (entry.type !== "file") {
      onDirChange(entry.path ?? "");
    } else {
      onFileOpen(entry);
    }
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
      sx={entry.type !== "file" ? { cursor: "pointer" } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon onClick={handleClick} />
      <PathTypography onClick={handleClick}>
        {entry.path?.split("/").slice(-1)[0]}
      </PathTypography>
      <Grid item xs={true} onClick={handleClick} />
      <Grid item style={hover ? {} : { opacity: 0 }}>
        {type?.startsWith("audio/") ? (
          <IconButton onClick={handleTranscribe}>
            <MusicNoteIcon />
          </IconButton>
        ) : null}
        <FileDeleteButton entry={entry} onDelete={onDelete} />
      </Grid>
    </Grid>
  );
};
