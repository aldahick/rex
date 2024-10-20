import { IMediaItemType } from "@aldahick/rex-sdk";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { sortBy } from "remeda";
import { FileContent } from "./FileContent";
import { FileListItem } from "./FileListItem";
import { useOpenFile, useRoot } from "./file.atom";

export const FileList: React.FC = () => {
  const [openFile] = useOpenFile();
  const [root] = useRoot();

  const children = sortBy(root?.children ?? [], (c) =>
    `${c.type === IMediaItemType.File ? "z" : c.type} - ${c.key}`.toLocaleLowerCase(),
  );

  return (
    <div className="pt-4">
      {openFile && (
        <div className="m-1">
          <FileContent item={openFile} />
        </div>
      )}
      <ListGroup>
        {children.map((child) => (
          <FileListItem key={child.key} child={child} />
        ))}
      </ListGroup>
    </div>
  );
};
