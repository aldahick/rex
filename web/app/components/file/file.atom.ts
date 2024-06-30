import { IMediaItem } from "@aldahick/rex-sdk";
import { atom } from "jotai";

export const openFileAtom = atom<IMediaItem | null>(null);
