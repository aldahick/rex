import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";

import {
  IMediaItem,
  IMediaItemType,
  useMediaItemsLazyQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";
import { FileBrowser } from "./FileBrowser";
import { FileTreeEntry, getDirAt } from "./FileTree";

const mediaItemToEntry = (
  { key, type }: IMediaItem,
  dir: string
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
  const [root, setRoot] = useState<FileTreeEntry>(cloneDeep(EMPTY_ROOT));
  const [fetchMediaItems] = useMediaItemsLazyQuery();
  const status = useStatus();

  const handleExpand = (newDir: string) => {
    console.log("handle expand", newDir);
    setDir(newDir);
    fetchMediaItems({ variables: { dir: newDir } }).then((result) => {
      const mediaItems = result.data?.mediaItems;
      console.log({ mediaItems });
      if (mediaItems) {
        const entry = getDirAt(root, newDir);
        entry.children = mediaItems.map((i) => mediaItemToEntry(i, newDir));
        entry.fetched = true;
        console.log("new entry!", entry);
      } else if (result.error) {
        status.error(result.error);
      }
    });
  };

  useEffect(() => {
    handleExpand("");
  }, []);

  return <FileBrowser dir={dir} root={root} onExpand={handleExpand} />;
};
