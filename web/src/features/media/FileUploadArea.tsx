import UploadIcon from "@mui/icons-material/Upload";
import { Grid, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { getFileEntryType, PathTypography } from "./FileListItem";

const DropAreaDiv = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[900],
}));

const UploadRowDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
}));

export interface FileUploadAreaProps {
  onStart: (file: File) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onStart }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles]),
  });

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, []);

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
            Drop files or click here to upload!
          </Typography>
        </Grid>
      </DropAreaDiv>
    </>
  );
};
