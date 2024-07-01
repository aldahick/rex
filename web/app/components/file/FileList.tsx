import { IMediaItemType } from "@aldahick/rex-sdk";
import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { sortBy } from "remeda";
import { MediaLoader } from "../../routes/media.$";
import { FileContent } from "./FileContent";
import { FileListItem } from "./FileListItem";
import { openFileAtom } from "./file.atom";

export const FileList: React.FC = () => {
  const [openFile] = useAtom(openFileAtom);
  const { root } = useLoaderData<MediaLoader>();

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
