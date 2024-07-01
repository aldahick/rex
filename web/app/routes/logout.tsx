import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authCookie } from "../cookies.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(
        {},
        {
          maxAge: -1,
        },
      ),
    },
  });
};

export default function LogoutRoute() {
  return null;
}
