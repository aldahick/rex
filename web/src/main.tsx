import "typeface-open-sans";
import "@emotion/react";

import React from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouteObject, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { config } from "./config";
import { AuthGuard } from "./features/auth/AuthGuard";
import { Layout } from "./features/layout/Layout";
import { IAuthPermission } from "./graphql";
import { StoreProvider } from "./hooks";
import { CatRoute } from "./routes/cat.route";
import { ErrorRoute } from "./routes/error.route";
import { LoginRoute } from "./routes/login.route";
import { MediaRoute } from "./routes/media.route";
import { MzkRoute } from "./routes/mzk.route";
import { NoteRoute } from "./routes/note.route";
import { NotesRoute } from "./routes/notes.route";
import { RegisterRoute } from "./routes/register.route";
import { RootRoute } from "./routes/root.route";

const routes: RouteObject[] = [
  {
    element: (
      <StoreProvider>
        <Layout>
          <Outlet />
        </Layout>
      </StoreProvider>
    ),
    errorElement: <ErrorRoute />,
    path: "/",
    children: [
      {
        index: true,
        element: <RootRoute />,
      },
      {
        path: "/login",
        element: <LoginRoute />,
      },
      {
        path: "/register",
        element: <RegisterRoute />,
      },
      {
        path: "/cat",
        element: <CatRoute />,
      },
      {
        path: "/media",
        element: (
          <AuthGuard permissions={[IAuthPermission.Media]}>
            <MediaRoute />
          </AuthGuard>
        ),
      },
      {
        path: "/mzk",
        element: (
          <AuthGuard
            permissions={[
              IAuthPermission.Media,
              IAuthPermission.Transcriptions,
            ]}
          >
            <MzkRoute />
          </AuthGuard>
        ),
      },
      {
        path: "/notes/:id",
        element: (
          <AuthGuard permissions={[IAuthPermission.Notes]}>
            <NoteRoute />
          </AuthGuard>
        ),
      },
      {
        path: "/notes",
        element: (
          <AuthGuard permissions={[IAuthPermission.Notes]}>
            <NotesRoute />
          </AuthGuard>
        ),
      },
    ],
  },
];

const container = document.getElementById("root");
if (!container) {
  throw new Error("Missing root element");
}
const router = createBrowserRouter(routes, { basename: config.basePath });
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
