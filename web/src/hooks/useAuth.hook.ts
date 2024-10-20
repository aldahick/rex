import { IAuthPermission, IAuthTokenFragment } from "@aldahick/rex-sdk";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

const STORAGE_KEY = "rex.authToken:v1";
const getFromStorage = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return;
  }
  const storedToken: IAuthTokenFragment = JSON.parse(storedValue);
  return storedToken;
};

const authTokenAtom = atom<IAuthTokenFragment | undefined>(getFromStorage());

export type Auth = ReturnType<typeof useAuth>;
export const useAuth = () => {
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const auth = useMemo(
    () => ({
      set: (value: IAuthTokenFragment | undefined) => {
        setAuthToken(value);
        if (value) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      },
      token: authToken,
      isAuthorized: (permission: IAuthPermission) =>
        authToken && isAuthorized(authToken.user.roles ?? [], permission),
    }),
    [authToken],
  );

  return auth;
};

export const isAuthorized = (
  roles: { permissions: IAuthPermission[] }[],
  needle: IAuthPermission,
) => roles.flatMap((role) => role.permissions).includes(needle);
