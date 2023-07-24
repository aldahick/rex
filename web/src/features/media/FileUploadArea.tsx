import UploadIcon from "@mui/icons-material/Upload";
import { Grid, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { getFileListItemIcon, PathTypography } from "./FileListItem";

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
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
  });

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  const handleUploadClick = () => {
    onStart(acceptedFiles[0]);
  };

  const Icon = getFileListItemIcon({
    type: "file",
    path: acceptedFiles[0]?.name,
  });

  return (
    <>
      <UploadRowDiv>
        <Grid
          container
          alignItems="center"
          style={acceptedFiles.length ? {} : { opacity: 0 }}
        >
          <Icon />
          <PathTypography>
            {acceptedFiles.map((f) => f.name).join(", ")}
          </PathTypography>
          <Grid item flexGrow={1} />
          <IconButton
            onClick={handleUploadClick}
            disabled={!acceptedFiles.length}
          >
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
