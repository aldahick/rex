import { Grid } from "@mui/material";
import React from "react";

import { HomeLinks } from "../features/home/HomeLinks";

export const RootRoute: React.FC = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <HomeLinks />
    </Grid>
  );
};
