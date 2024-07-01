import { IMediaItem, IMediaItemType } from "@aldahick/rex-sdk";
import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import romans from "romans";
import { FileBrowser } from "../components/file/FileBrowser";
import { FileSeries } from "../components/file/FileSeries";
import { config } from "../config.server";
import { withAuthRexSdk } from "../rex.sdk";

export const meta: MetaFunction = ({ params }) => [
  { title: `Rex | Media${params["*"] ? `: ${params["*"]}` : ""}` },
];

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

export type MediaLoader = typeof loader;
export const loader = withAuthRexSdk(async (sdk, { params, auth }) => {
  const key = params["*"] ?? "";
  const { mediaItem } = await sdk.getMediaItem({ key });
  mediaItem?.children?.sort(sortMediaItems);
  return { root: mediaItem, auth, config };
});

export default function MediaRoute() {
  const { root } = useLoaderData<MediaLoader>();

  if (root?.type === IMediaItemType.Series) {
    return <FileSeries />;
  }
  return <FileBrowser />;
}
