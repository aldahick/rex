import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { unique } from "remeda";
import { HomeLinks } from "../components/home/HomeLinks";
import { getCookieAuth } from "../cookies.server";

export const meta: MetaFunction = () => [{ title: "Rex | Alex Hicks" }];

export type IndexLoader = typeof loader;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const auth = await getCookieAuth(request);
  return {
    auth: auth
      ? {
          ...auth,
          permissions: unique(
            auth?.user.roles?.flatMap((r) => r.permissions) ?? [],
          ).sort(),
        }
      : null,
  };
};

export default function IndexRoute() {
  return (
    <div className="flex flex-col items-center">
      <HomeLinks />
    </div>
  );
}
