import { IAuthPermission, IAuthTokenFragment } from "@aldahick/rex-sdk";
import { atom } from "jotai";

type AuthAtomValue = IAuthTokenFragment & {
  permissions: IAuthPermission[];
};
export const authAtom = atom<AuthAtomValue | undefined>(undefined);
