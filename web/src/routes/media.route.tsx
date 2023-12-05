import React from "react";
import { useMatch } from "react-router";

import { MediaBrowser } from "../features/media/MediaBrowser";

export const MediaRoute: React.FC = () => {
  const match = useMatch("/media/:dir?");
  let dir = match?.params.dir;
  if (dir) {
    dir = decodeURIComponent(dir);
  }
  return <MediaBrowser dir={dir} />;
};
