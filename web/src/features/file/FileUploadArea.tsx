import UploadIcon from "@mui/icons-material/Upload";
import { Grid, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { RexLink } from "../utils/RexLink";
import { getFileEntryType, PathTypography } from "./FileListItem";

const DropAreaDiv = styled("div")({
  minHeight: "50vh",
  backgroundColor: "rgba(33,33,33,0.25)",
});

const UploadRowDiv = styled("div")({
  backgroundColor: "rgba(33,33,33,0.25)",
});

export interface FileUploadAreaProps {
  onStart: (file: File) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onStart }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles]),
  });

  const handleUploadClick = () => {
    onStart(files[0]);
    setFiles([]);
  };

  const [Icon] = getFileEntryType({
    type: "file",
    path: files[0]?.name,
  });

  return (
    <>
      <UploadRowDiv>
        <Grid
          container
          alignItems="center"
          style={files.length ? {} : { opacity: 0 }}
        >
          <Icon />
          <PathTypography>{files.map((f) => f.name).join(", ")}</PathTypography>
          <Grid item flexGrow={1} />
          <IconButton onClick={handleUploadClick} disabled={!files.length}>
            <UploadIcon color="success" />
          </IconButton>
        </Grid>
      </UploadRowDiv>
      <DropAreaDiv {...getRootProps()}>
        <input {...getInputProps()} />
        <Grid container justifyContent="center" paddingTop="2em">
          <Typography textAlign="center">
            Drop a file or click{" "}
            <RexLink to="" onClick={open} sx={{ cursor: "pointer" }}>
              here
            </RexLink>
            {" to upload!"}
          </Typography>
        </Grid>
      </DropAreaDiv>
    </>
  );
};
