import { IMediaItem, IMediaItemType } from "@aldahick/rex-sdk";
import { CopyIcon, FileIcon, FolderIcon } from "lucide-react";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useOpenFile } from "./file.atom";

const typeIcons = {
  [IMediaItemType.Directory]: FolderIcon,
  [IMediaItemType.File]: FileIcon,
  [IMediaItemType.Series]: CopyIcon,
};

export const FileListItem: React.FC<{ child: IMediaItem }> = ({ child }) => {
  const [, setOpenFile] = useOpenFile();
  const Icon = typeIcons[child.type];

  const handleFileOpen = () => {
    setOpenFile(child);
  };

  const listItem = (
    <ListGroup.Item className="cursor-pointer ml-4">
      <div className="flex">
        <Icon type={child.type} className="mr-4" />
        <span>{child.key.split("/").slice(-1)[0]}</span>
      </div>
    </ListGroup.Item>
  );

  if (child.type === IMediaItemType.File) {
    return (
      <div onKeyUp={handleFileOpen} onClick={handleFileOpen}>
        {listItem}
      </div>
    );
  }
  return <Link to={`/media/${encodeURIComponent(child.key)}`}>{listItem}</Link>;
};
