import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import { Grid, Link, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { IAuthPermission } from "../../graphql";
import { useStores } from "../../hooks";
import githubDarkLogoUrl from "../../images/logos/github-dark.png";
import githubLightLogoUrl from "../../images/logos/github-light.png";
import linkedInLogoUrl from "../../images/logos/linkedin.png";
import stravaLogoUrl from "../../images/logos/strava.svg";
import { HexSelect } from "../utils/HexSelect";
import { RexLink } from "../utils/RexLink";
import { SocialBadge } from "../utils/SocialBadge";
import { AthenaIcon } from "./AthenaIcon";

const BLUE = "rgba(0, 87, 183, 0.5)";
const YELLOW = "rgba(255, 221, 0, 0.5)";

const repositories = [
  { icon: PublicIcon, repo: "rex" },
  { icon: MapIcon, repo: "mapgame" },
  { icon: AthenaIcon, repo: "athena" },
];

export interface HomeLinksProps {
  primaryBackground?: string;
  secondaryBackground?: string;
}

export const HomeLinks: React.FC<HomeLinksProps> = observer(
  ({ primaryBackground = YELLOW, secondaryBackground = BLUE }) => {
    const { authStore } = useStores();
    const theme = useTheme();
    const authSuffix = authStore.isAuthenticated ? "Out" : "In";

    return (
      <HexSelect background={[primaryBackground, secondaryBackground]}>
        {{
          topLeft: {
            styles: { paddingTop: "33%" },
            element: (
              <>
                <SocialBadge
                  imageUrl={
                    theme.palette.mode === "dark"
                      ? githubDarkLogoUrl
                      : githubLightLogoUrl
                  }
                  url="https://github.com/aldahick"
                  label="@aldahick"
                  textColor="textPrimary"
                  imageProps={{ alt: "GitHub logo" }}
                />
                {repositories.map(({ repo, icon: Icon }) => (
                  <Grid key={repo} item sx={{ marginTop: "1em" }}>
                    <Link
                      href={`https://github.com/aldahick/${repo}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Grid container alignContent="center">
                        <Icon />
                        <Typography component="span">&nbsp;{repo}</Typography>
                      </Grid>
                    </Link>
                  </Grid>
                ))}
              </>
            ),
          },
          topCenter: {
            element: (
              <RexLink
                to={`/log${authSuffix.toLowerCase()}`}
                title={`Log ${authSuffix}`}
              >
                <Typography
                  textAlign="center"
                  variant="h1"
                  style={{
                    cursor: "pointer",
                    ...(authStore.isAuthenticated
                      ? { transform: "scale(-1, 1)" }
                      : {}),
                  }}
                >
                  👋
                </Typography>
              </RexLink>
            ),
          },
          topRight: {
            styles: { paddingTop: "25%" },
            element: (
              <>
                <SocialBadge
                  imageUrl={linkedInLogoUrl}
                  url="https://linkedin.com/in/aldahick"
                  label="@aldahick"
                  textColor="textPrimary"
                  imageProps={{ alt: "LinkedIn logo" }}
                />
                <div style={{ marginTop: "1em" }}>
                  <SocialBadge
                    imageUrl={stravaLogoUrl}
                    url="https://strava.com/athletes/aldahick"
                    label="@aldahick"
                    textColor="textPrimary"
                    imageProps={{ alt: "Strava logo" }}
                  />
                </div>
              </>
            ),
          },
          bottomLeft: {
            element: authStore.isAuthorized(IAuthPermission.Projects) ? (
              <RexLink to="/project-configs" textAlign="center">
                <Typography variant="h3">🐗</Typography>
                <Typography>View project statistics</Typography>
              </RexLink>
            ) : null,
          },
          bottomCenter: {
            styles: { paddingTop: "25%" },
            element: (
              <RexLink to="/cat" textAlign="center">
                <Typography variant="h3">🐈</Typography>
                <Typography>The cat game!</Typography>
              </RexLink>
            ),
          },
          bottomRight: {
            element: (
              <>
                {authStore.isAuthorized(IAuthPermission.Transcriptions) ? (
                  <RexLink to="/mzk" textAlign="center">
                    <Typography variant="h3">🎼</Typography>
                    <Typography>Transcribe sheet music</Typography>
                  </RexLink>
                ) : null}
                {authStore.isAuthorized(IAuthPermission.Media) ? (
                  <RexLink to="/media" textAlign="center">
                    <Typography variant="h3">📁</Typography>
                    <Typography>Manage media</Typography>
                  </RexLink>
                ) : null}
              </>
            ),
          },
        }}
      </HexSelect>
    );
  },
);
