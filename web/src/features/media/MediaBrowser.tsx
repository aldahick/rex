import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";

import {
  IMediaItem,
  IMediaItemType,
  useMediaItemsLazyQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";
import { FileBrowser } from "./FileBrowser";
import { FileTreeEntry, getDirAt } from "./FileTreeEntry";

const mediaItemToEntry = (
  { key, type }: IMediaItem,
  dir: string,
): FileTreeEntry => ({
  fetched: type === IMediaItemType.File,
  type: type === IMediaItemType.File ? "file" : "directory",
  path: `${dir}${dir === "" ? "" : "/"}${key}`,
  children: [],
});

const EMPTY_ROOT: FileTreeEntry = {
  type: "directory",
  fetched: false,
  children: [],
};

/**
 * Wraps a {@link FileBrowser} with Rex media-related operations
 */
export const MediaBrowser: React.FC = () => {
  // no preceding "/"
  const [dir, setDir] = useState("");
  const [root] = useState<FileTreeEntry>(cloneDeep(EMPTY_ROOT));
  const [fetchMediaItems] = useMediaItemsLazyQuery();
  const status = useStatus();

  const handleDirChange = (newDir: string) => {
    fetchMediaItems({ variables: { dir: newDir } }).then((result) => {
      const mediaItems = result.data?.mediaItems;
      if (mediaItems) {
        const entry = getDirAt(root, newDir, true);
        entry.children = mediaItems.map((i) => mediaItemToEntry(i, newDir));
        entry.fetched = true;
        setDir(newDir);
      } else if (result.error) {
        status.error(result.error);
      }
    });
  };

  useEffect(() => {
    handleDirChange("");
  }, []);

  return (
    <FileBrowser
      dir={dir}
      root={root}
      onDirChange={handleDirChange}
      onExpand={handleDirChange}
    />
  );
};
