import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { clone } from "remeda";
import { useImmer } from "use-immer";
import {
  IMediaItem,
  IMediaItemType,
  useCreateMediaUploadMutation,
  useDeleteMediaMutation,
  useMediaItemQuery,
} from "../../graphql";
import { useStatus, useStores } from "../../hooks";
import { FileBrowser } from "../file/FileBrowser";
import { FileTreeEntry, getFileEntryAt } from "../file/FileTreeEntry";
import { MediaContentView } from "./MediaContentView";

export const mediaItemToEntry = ({ key, type }: IMediaItem): FileTreeEntry => ({
  fetched: type === IMediaItemType.File,
  type:
    type === IMediaItemType.File
      ? "file"
      : type === IMediaItemType.Series
        ? "series"
        : "directory",
  path: key,
  children: [],
});

const EMPTY_ROOT: FileTreeEntry = {
  type: "directory",
  fetched: false,
  children: [],
};

interface MediaBrowserProps {
  dir: string;
}

/**
 * Wraps a {@link FileBrowser} with Rex media-related operations
 */
export const MediaBrowser: React.FC<MediaBrowserProps> = observer(({ dir }) => {
  // no preceding "/"
  const [root, setRoot] = useImmer(clone(EMPTY_ROOT));
  const [selected, setSelected] = useState<FileTreeEntry>();
  const [createMediaUpload] = useCreateMediaUploadMutation();
  const [deleteMedia] = useDeleteMediaMutation();
  const status = useStatus();
  const { authStore } = useStores();
  const navigate = useNavigate();

  useMediaItemQuery({
    variables: {
      key: dir,
    },
    onCompleted: ({ mediaItem }) => {
      setRoot((root) => {
        const children = mediaItem?.children;
        if (!children) {
          throw new Error(`Key ${dir} does not exist`);
        }
        const entry = getFileEntryAt(root, dir, true);
        if (mediaItem.type === IMediaItemType.Series) {
          entry.type = "series";
        }
        entry.children = children
          ?.filter((i) => !i.key.startsWith("."))
          .map((i) => clone(mediaItemToEntry(i)));
        entry.fetched = true;
      });
    },
    onError: (err) => {
      status.error(err);
    },
  });

  const changeDir = (newDir: string) => {
    navigate(`/media/${encodeURIComponent(newDir)}`);
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
    const { uploadUrl } = res.data;
    status.info(
      `Uploading file ${key}... (${(file.size / 1024 ** 2).toFixed(2)} MB)`,
    );
    const form = new FormData();
    form.append("file", file);
    const uploadRes = await fetch(uploadUrl, {
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

  return (
    <FileBrowser
      dir={dir}
      root={root}
      content={
        selected &&
        authStore.token && (
          <MediaContentView entry={selected} token={authStore.token} />
        )
      }
      onDelete={(entry) => deleteFile(entry).catch(status.error)}
      onDirChange={changeDir}
      onExpand={changeDir}
      onFileOpen={(entry) => setSelected(entry)}
      onUploadStart={(file) => uploadFile(file).catch(status.error)}
    />
  );
});
