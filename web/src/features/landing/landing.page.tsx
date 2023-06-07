import {
  Grid, Typography, useTheme,
} from "@material-ui/core";
import React from "react";

import githubDarkLogoUrl from "../../images/logos/github-dark.png";
import githubLightLogoUrl from "../../images/logos/github-light.png";
import linkedInLogoUrl from "../../images/logos/linkedin.png";
import { SocialBadge } from "../utils/components/SocialBadge";

export const LandingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1">
          👋
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "1em" }}>
        <Grid container justify="center" spacing={4}>
          <Grid item>
            <SocialBadge
              imageUrl={theme.palette.type === "dark"
                ? githubDarkLogoUrl
                : githubLightLogoUrl}
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
