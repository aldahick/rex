import { IMediaItem } from "@aldahick/rex-sdk";
import { atom, useAtom } from "jotai";

const openFileAtom = atom<IMediaItem | null>(null);
export const useOpenFile = () => useAtom(openFileAtom);

const rootAtom = atom<IMediaItem>();
export const useRoot = () => useAtom(rootAtom);
