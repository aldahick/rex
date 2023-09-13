import ConfirmIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

import { FileTreeEntry } from "./FileTreeEntry";

export interface FileDeleteButtonProps {
  entry: FileTreeEntry;
  onDelete: (entry: FileTreeEntry) => void;
}

export const FileDeleteButton: React.FC<FileDeleteButtonProps> = ({
  entry,
  onDelete,
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (confirming) {
      onDelete(entry);
    } else {
      setConfirming(true);
    }
  };

  const Icon = confirming ? ConfirmIcon : DeleteIcon;

  return (
    <IconButton onClick={handleClick}>
      <Icon color="error" />
    </IconButton>
  );
};
