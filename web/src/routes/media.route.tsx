import React from "react";
import { useMatch } from "react-router";

import { MediaBrowser } from "../features/media/MediaBrowser";

export const MediaRoute: React.FC = () => {
  const match = useMatch("/media/:dir?");
  const dir = decodeURIComponent(match?.params.dir ?? "");
  return <MediaBrowser dir={dir} />;
};
