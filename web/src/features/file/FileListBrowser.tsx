import { Grid, styled } from "@mui/material";
import React from "react";
import { FileListItem, FileListItemCallbacks } from "./FileListItem";
import { FileTreeEntry } from "./FileTreeEntry";
import { FileUploadArea } from "./FileUploadArea";

const RootGrid = styled(Grid)(({ theme }) => ({
  padding: "1em",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "1em",
  },
}));

const ChildGrid = styled(Grid)({
  margin: "0.25em",
}) as typeof Grid;

export interface FileListBrowserProps extends FileListItemCallbacks {
  entries: FileTreeEntry[];
  content?: React.ReactNode;
  onUploadStart: (file: File) => void;
}

export const FileListBrowser: React.FC<FileListBrowserProps> = ({
  entries,
  content,
  onUploadStart,
  ...callbacks
}) => {
  return (
    <RootGrid container paddingTop="1em" direction="column">
      {content ? <ChildGrid>{content}</ChildGrid> : null}
      {entries.map((entry) => (
        <ChildGrid item key={entry.path ?? ""}>
          <FileListItem entry={entry} {...callbacks} />
        </ChildGrid>
      ))}
      {content ? null : (
        <ChildGrid>
          <FileUploadArea onStart={onUploadStart} />
        </ChildGrid>
      )}
    </RootGrid>
  );
};
