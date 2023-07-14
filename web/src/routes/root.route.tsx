import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

import { HomeLinks } from "../features/home/HomeLinks";
import { SocialBadge } from "../features/utils/SocialBadge";
import githubDarkLogoUrl from "../images/logos/github-dark.png";
import githubLightLogoUrl from "../images/logos/github-light.png";
import linkedInLogoUrl from "../images/logos/linkedin.png";

export const RootRoute: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1">👋</Typography>
      </Grid>
      <HomeLinks />
      <Grid item style={{ marginTop: "1em" }}>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <SocialBadge
              imageUrl={
                theme.palette.mode === "dark"
                  ? githubDarkLogoUrl
                  : githubLightLogoUrl
              }
              url="https://github.com/aldahick"
              label="@aldahick"
              textColor="textPrimary"
            />
          </Grid>
          <Grid item>
            <SocialBadge
              imageUrl={linkedInLogoUrl}
              url="https://linkedin.com/in/aldahick"
              label="@aldahick"
              textColor="textPrimary"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
