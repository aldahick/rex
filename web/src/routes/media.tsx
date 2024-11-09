import { IMediaItem, IMediaItemType } from "@aldahick/rex-sdk";
import { useGetBaseMediaItemQuery } from "@aldahick/rex-sdk/react";
import React from "react";
import { useParams } from "react-router-dom";
import { clone } from "remeda";
import romans from "romans";
import { FileBrowser } from "../components/file/FileBrowser";
import { FileSeries } from "../components/file/FileSeries";
import { useRoot } from "../components/file/file.atom";

const getPathIndex = (path: string): number => {
  const prefix = path.split("/").slice(-1)[0]?.split(".")[0];
  try {
    const deromanized = romans.deromanize(prefix ?? "");
    return deromanized;
  } catch {
    return Number.parseInt(prefix ?? "");
  }
};

const typeSorts = [
  IMediaItemType.Directory,
  IMediaItemType.Series,
  IMediaItemType.File,
];
export const sortMediaItems = (a: IMediaItem, b: IMediaItem): number => {
  const aIndex = getPathIndex(a.key);
  const bIndex = getPathIndex(b.key);
  if (!Number.isNaN(aIndex)) {
    if (!Number.isNaN(bIndex)) {
      return aIndex - bIndex;
    }
    return -1;
  }
  const typeDiff = typeSorts.indexOf(a.type) - typeSorts.indexOf(b.type);
  if (typeDiff !== 0) {
    return typeDiff;
  }
  return a.key.localeCompare(b.key);
};

export const MediaRoute: React.FC = () => {
  const params = useParams();
  useGetBaseMediaItemQuery({
    variables: {
      key: params["*"] ?? "",
    },
    onCompleted: (data) => {
      const mediaItem = clone(data.mediaItem);
      mediaItem?.children?.sort(sortMediaItems);
      setRoot(mediaItem);
    },
  });
  const [root, setRoot] = useRoot();

  if (root?.type === IMediaItemType.Series) {
    return <FileSeries />;
  }
  return <FileBrowser />;
};
