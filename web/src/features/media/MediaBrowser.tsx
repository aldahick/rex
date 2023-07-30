import { Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";

import {
  IMediaItem,
  IMediaItemType,
  useCreateMediaUploadMutation,
  useDeleteMediaMutation,
  useMediaItemsLazyQuery,
  useStartTranscriptionMutation,
} from "../../graphql";
import { useStatus, useStores } from "../../hooks";
import { FileBrowser } from "../file/FileBrowser";
import { FileTreeEntry, getFileEntryAt } from "../file/FileTreeEntry";
import { RexLink } from "../utils/RexLink";
import { MediaContentView } from "./MediaContentView";

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
  const [root, setRoot] = useImmer(cloneDeep(EMPTY_ROOT));
  const [selected, setSelected] = useState<FileTreeEntry>();
  const [fetchMediaItems] = useMediaItemsLazyQuery();
  const [createMediaUpload] = useCreateMediaUploadMutation();
  const [deleteMedia] = useDeleteMediaMutation();
  const [startTranscription] = useStartTranscriptionMutation();
  const status = useStatus();
  const { authStore } = useStores();

  const changeDir = async (newDir: string) => {
    const result = await fetchMediaItems({ variables: { dir: newDir } });
    const mediaItems = result.data?.mediaItems;
    if (mediaItems) {
      setRoot((root) => {
        const entry = getFileEntryAt(root, newDir, true);
        entry.children = mediaItems.map((i) =>
          cloneDeep(mediaItemToEntry(i, newDir)),
        );
        entry.fetched = true;
      });
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
    setRoot((root) => {
      const dirEntry = getFileEntryAt(root, dirPath, false);
      if (dirEntry) {
        dirEntry.children = dirEntry.children.filter(
          (c) => c.path !== entry.path,
        );
      } else {
        console.warn("No parent entry found while deleting", entry);
      }
    });
    status.info(`Successfully deleted "${entry.path}"`);
  };

  const uploadFile = async (file: File) => {
    const key = (dir === "" ? "" : `${dir}/`) + file.name;
    const res = await createMediaUpload({ variables: { key } });
    if (res.errors || !res.data) {
      throw res.errors?.[0] ?? new Error("No upload URL returned from API");
    }
    const { uploadUrl: url } = res.data;
    status.info(
      `Uploading file ${key}... (${(file.size / 1024 ** 2).toFixed(2)} MB)`,
    );
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
    setRoot((root) => {
      const dirEntry = getFileEntryAt(root, dir, false);
      if (dirEntry && !dirEntry.children.some((e) => e.path === key)) {
        dirEntry.children.push({
          fetched: false,
          type: "file",
          children: [],
          path: key,
        });
      } else {
        console.warn("No parent entry found while uploading", file, key);
      }
    });
    status.success(`Successfully uploaded ${file.name}`);
  };

  const handleStartTranscription = async (entry: FileTreeEntry) => {
    if (!entry.path || entry.type !== "file") {
      throw new Error("Cannot transcribe a directory");
    }
    const res = await startTranscription({ variables: { key: entry.path } });
    if (res.errors || !res.data) {
      throw (
        res.errors?.[0] ?? new Error("No transcription ID returned from API")
      );
    }
    const { transcription } = res.data;
    status.success(
      <Typography>
        Started transcribing {entry.path}{" "}
        <RexLink to={`/mzk/${transcription.id}`}>here</RexLink>
      </Typography>,
    );
  };

  useEffect(() => {
    changeDir("");
  }, []);

  return (
    <FileBrowser
      dir={dir}
      root={root}
      content={
        selected && authStore.token ? (
          <MediaContentView entry={selected} token={authStore.token} />
        ) : undefined
      }
      onDelete={(entry) => deleteFile(entry).catch(status.error)}
      onDirChange={changeDir}
      onExpand={changeDir}
      onFileOpen={(entry) => setSelected(entry)}
      onUploadStart={(file) => uploadFile(file).catch(status.error)}
      onTranscribe={(entry) =>
        handleStartTranscription(entry).catch(status.error)
      }
    />
  );
});
