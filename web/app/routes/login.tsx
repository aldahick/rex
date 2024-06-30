import { IAuthTokenParams } from "@aldahick/rex-sdk";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { AuthGoogleButton } from "../components/auth/AuthGoogleButton";
import { AuthLoginForm } from "../components/auth/AuthLoginForm";
import { DividerText } from "../components/util/DividerText";
import { FormContainer } from "../components/util/FormContainer";
import { config } from "../config.server";
import { authCookie } from "../cookies.server";
import { getRexSdk } from "../rex.sdk";
import { formToObject } from "../utils/form.util";

export const meta: MetaFunction = () => [
  {
    title: "Rex | Log In",
  },
];

export type LoginLoader = typeof loader;
export const loader = async () => {
  const sdk = getRexSdk();
  const { config: rexConfig } = await sdk.getConfig();
  return {
    config: {
      ...config,
      ...rexConfig,
    },
  };
};

export default function LoginRoute() {
  const {
    config: { googleClientId },
  } = useLoaderData<LoginLoader>();

  return (
    <FormContainer title="Log In">
      <AuthLoginForm />
      {googleClientId ? (
        <>
          <DividerText>OR</DividerText>
          <AuthGoogleButton />
        </>
      ) : null}
    </FormContainer>
  );
}

export type LoginAction = typeof action;
export const action = async ({ request }: ActionFunctionArgs) => {
  const sdk = getRexSdk();
  const params = formToObject(await request.formData(), loginForm);
  const { authToken } = await sdk.getAuthToken({ params });
  const from = new URLSearchParams(request.url).get("from");
  return redirect(from ?? "/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(authToken),
    },
  });
};

const loginForm = z
  .union([
    z.object({
      provider: z.enum(["local"]),
      username: z.string(),
      password: z.string(),
    }),
    z.object({
      provider: z.enum(["google"]),
      idToken: z.string(),
    }),
  ])
  .transform(
    (form): IAuthTokenParams => ({
      ...(form.provider === "local"
        ? {
            local: {
              username: form.username,
              password: form.password,
            },
          }
        : {}),
      ...(form.provider === "google"
        ? {
            google: {
              idToken: form.idToken,
            },
          }
        : {}),
    }),
  );
