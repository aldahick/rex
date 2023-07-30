import FolderIcon from "@mui/icons-material/Folder";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";

import { TranscriptionTable } from "../features/mzk/TranscriptionTable";
import { RexLink } from "../features/utils/RexLink";

export const MzkRoute: React.FC = () => {
  return (
    <div>
      <RexLink to="/media">
        <Grid container alignItems="center">
          <IconButton>
            <FolderIcon />
          </IconButton>
          <Typography>Manage media</Typography>
        </Grid>
      </RexLink>
      <TranscriptionTable />
    </div>
  );
};
