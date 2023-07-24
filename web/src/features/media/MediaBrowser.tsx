import { cloneDeep } from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import {
  IMediaItem,
  IMediaItemType,
  useCreateMediaUploadMutation,
  useDeleteMediaMutation,
  useMediaItemsLazyQuery,
} from "../../graphql";
import { useStatus, useStores } from "../../hooks";
import { FileBrowser } from "./FileBrowser";
import { FileTreeEntry, getFileEntryAt } from "./FileTreeEntry";

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
export const MediaBrowser: React.FC = observer(() => {
  // no preceding "/"
  const [dir, setDir] = useState("");
  const [root, setRoot] = useState<FileTreeEntry>(cloneDeep(EMPTY_ROOT));
  const [fetchMediaItems] = useMediaItemsLazyQuery();
  const [createMediaUpload] = useCreateMediaUploadMutation();
  const [deleteMedia] = useDeleteMediaMutation();
  const status = useStatus();
  const { authStore } = useStores();

  const changeDir = async (newDir: string) => {
    const result = await fetchMediaItems({ variables: { dir: newDir } });
    const mediaItems = result.data?.mediaItems;
    if (mediaItems) {
      const entry = getFileEntryAt(root, newDir, true);
      entry.children = mediaItems.map((i) => mediaItemToEntry(i, newDir));
      entry.fetched = true;
      setDir(newDir);
    } else if (result.error) {
      status.error(result.error);
    }
  };

  const deleteFile = async (entry: FileTreeEntry) => {
    if (!entry.path) {
      throw new Error("Cannot delete root!");
    }
    await deleteMedia({ variables: { key: entry.path } });
    const dirPath = entry.path.split("/").slice(0, -1).join("/");
    const dirEntry = getFileEntryAt(root, dirPath, false);
    if (dirEntry) {
      dirEntry.children = dirEntry.children.filter(
        (c) => c.path !== entry.path,
      );
      console.log(dirEntry.children);
      setRoot(root);
    } else {
      console.warn("No parent entry found while deleting", entry);
    }
    status.info(`Successfully deleted "${entry.path}"`);
  };

  const uploadFile = async (file: File) => {
    const key = dir + "/" + file.name;
    const res = await createMediaUpload({ variables: { key } });
    if (res.errors || !res.data) {
      throw res.errors?.[0] ?? new Error("No upload URL returned from API");
    }
    const { uploadUrl: url } = res.data;
    const form = new FormData();
    form.append("file", file);
    const uploadRes = await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    if (!uploadRes.ok) {
      const err =
        ((await uploadRes.json()).message as string) ?? uploadRes.statusText;
      throw new Error(`Failed to upload file: ${err}`);
    }
    const dirEntry = getFileEntryAt(root, dir, false);
    if (dirEntry) {
      dirEntry.children = dirEntry.children.filter((c) => c.path !== key);
      setRoot(root);
    } else {
      console.warn("No parent entry found while uploading", file, key);
    }
    status.success(`Successfully uploaded ${file.name}`);
  };

  useEffect(() => {
    changeDir("");
  }, []);

  return (
    <FileBrowser
      dir={dir}
      root={root}
      onDelete={(entry) => deleteFile(entry).catch(status.error)}
      onDirChange={changeDir}
      onExpand={changeDir}
      onUploadStart={(file) => uploadFile(file).catch(status.error)}
    />
  );
});
