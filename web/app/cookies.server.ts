import { IFullAuthTokenFragment } from "@aldahick/rex-sdk";
import { createCookie } from "@remix-run/node";

export const authCookie = createCookie("rex:authToken");
export const getCookieAuth = (
  request: Request,
): Promise<IFullAuthTokenFragment | null> =>
  authCookie.parse(request.headers.get("Cookie"));
