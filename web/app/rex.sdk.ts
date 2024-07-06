import {
  IFullAuthTokenFragment,
  RexSdk,
  getBaseRexSdk,
} from "@aldahick/rex-sdk";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { config } from "./config.server";
import { getCookieAuth } from "./cookies.server";

export const getRexSdk = (token?: string) =>
  getBaseRexSdk({
    graphqlUrl: `${config.apiUrl}graphql`,
    config: {
      headers: new Headers(
        token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      ),
    },
  });

type AuthSdkArgs = (LoaderFunctionArgs | ActionFunctionArgs) & {
  auth: IFullAuthTokenFragment;
};

export const withAuthRexSdk =
  <T>(callback: (sdk: RexSdk, args: AuthSdkArgs) => Promise<T>) =>
  async (
    args: LoaderFunctionArgs | ActionFunctionArgs,
  ): Promise<TypedResponse<never> | T> => {
    const auth = await getCookieAuth(args.request);
    if (!auth) {
      const loginUrl = `/login?${new URLSearchParams({ from: new URL(args.request.url).pathname })}`;
      return redirect(loginUrl);
    }
    const sdk = getRexSdk(auth.token);
    return callback(sdk, { ...args, auth });
  };
