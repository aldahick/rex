import { IAuthPermission, IFullAuthTokenFragment } from "@aldahick/rex-sdk";
import { atom } from "jotai";

type AuthAtomValue = IFullAuthTokenFragment & {
  permissions: IAuthPermission[];
};
export const authAtom = atom<AuthAtomValue | undefined>(undefined);
