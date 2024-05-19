import FileCopyIcon from "@mui/icons-material/FileCopy";
import FolderIcon from "@mui/icons-material/Folder";
import React from "react";
import { IMediaItemType } from "../../graphql";

export interface MediaTypeIconProps {
  type: IMediaItemType;
}

const typeIcons: Record<IMediaItemType, React.FC | null> = {
  [IMediaItemType.Directory]: FolderIcon,
  [IMediaItemType.File]: null,
  [IMediaItemType.Series]: FileCopyIcon,
};

export const MediaTypeIcon: React.FC<MediaTypeIconProps> = ({ type }) => {
  const Icon = typeIcons[type];
  return Icon ? <Icon /> : null;
};
