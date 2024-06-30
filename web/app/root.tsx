import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import globalCssUrl from "./global.css?url";
import { StatusProvider } from "./hooks/useStatus.hook";
import tailwindCssUrl from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindCssUrl },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
  },
  { rel: "stylesheet", href: globalCssUrl },
];

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#121212" />
      <link
        rel="stylesheet"
        href=""
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <Meta />
      <Links />
    </head>
    <body data-bs-theme="dark">{children}</body>
  </html>
);

export default ({ children }: React.PropsWithChildren) => (
  <Layout>
    <StatusProvider />
    {children ?? <Outlet />}
    <ScrollRestoration />
    <Scripts />
  </Layout>
);

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  const details =
    error instanceof Error
      ? error.stack ?? error.message
      : JSON.stringify(error, undefined, 2);

  return (
    <Layout>
      <h1>An error occurred!</h1>
      <pre style={{ color: "rgb(192,0,0)" }}>{details}</pre>
      <Scripts />
    </Layout>
  );
};
