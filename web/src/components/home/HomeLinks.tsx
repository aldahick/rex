import { IAuthPermission } from "@aldahick/rex-sdk";
import { GlobeIcon, MapIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.hook";
import { AthenaIcon } from "../../images/logos/AthenaIcon";
import githubDarkLogoUrl from "../../images/logos/github-dark.png";
import linkedInLogoUrl from "../../images/logos/linkedin.png";
import stravaLogoUrl from "../../images/logos/strava.svg";
import { SocialBadge } from "../util/SocialBadge";
import { HexSelect } from "./HexSelect";

const BLUE = "rgba(0, 87, 183, 0.5)";
const YELLOW = "rgba(255, 221, 0, 0.5)";

const repositories = [
  { icon: GlobeIcon, repo: "rex" },
  { icon: MapIcon, repo: "mapgame" },
  {
    icon: AthenaIcon,
    repo: "athena",
  },
];

export interface HomeLinksProps {
  primaryBackground?: string;
  secondaryBackground?: string;
}

export const HomeLinks: React.FC<HomeLinksProps> = ({
  primaryBackground = YELLOW,
  secondaryBackground = BLUE,
}) => {
  const auth = useAuth();
  const authSuffix = auth.token ? "Out" : "In";

  return (
    <HexSelect background={[primaryBackground, secondaryBackground]}>
      {{
        topLeft: {
          styles: { paddingTop: "33%" },
          element: (
            <>
              <SocialBadge
                imageUrl={githubDarkLogoUrl}
                url="https://github.com/aldahick"
                label="@aldahick"
                textColor="textPrimary"
                imageProps={{ alt: "GitHub logo" }}
              />
              {repositories.map(({ repo, icon: Icon }) => (
                <div key={repo} className="mt-4">
                  <Link
                    to={`https://github.com/aldahick/${repo}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="flex content-center">
                      <Icon />
                      <span>&nbsp;{repo}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ),
        },
        topCenter: {
          element: (
            <Link
              to={`/log${authSuffix.toLowerCase()}`}
              title={`Log ${authSuffix}`}
            >
              <h1
                className="cursor-pointer text-center"
                style={auth ? { transform: "scale(-1, 1)" } : {}}
              >
                👋
              </h1>
            </Link>
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
          element: auth.isAuthorized(IAuthPermission.Projects) ? (
            <Link to="/projects" style={{ textAlign: "center" }}>
              <h3>🐗</h3>
              <span>View project statistics</span>
            </Link>
          ) : null,
        },
        bottomCenter: {
          styles: { paddingTop: "25%" },
          element: (
            <Link to="/cat" style={{ textAlign: "center" }}>
              <h3>🐈</h3>
              <span>The cat game!</span>
            </Link>
          ),
        },
        bottomRight: {
          element: auth.isAuthorized(IAuthPermission.Media) ? (
            <Link to="/media" style={{ textAlign: "center" }}>
              <h3>📁</h3>
              <span>Manage media</span>
            </Link>
          ) : null,
        },
      }}
    </HexSelect>
  );
};
