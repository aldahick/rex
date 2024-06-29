import "@emotion/react";
import "typeface-open-sans";

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
import { LogoutRoute } from "./routes/logout.route";
import { MediaRoute } from "./routes/media.route";
import { NoteRoute } from "./routes/note.route";
import { NotesRoute } from "./routes/notes.route";
import { ProjectConfigsRoute } from "./routes/project-configs.route";
import { ProjectRoute } from "./routes/project.route";
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
        path: "/logout",
        element: <LogoutRoute />,
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
        path: "/media/:dir?",
        element: (
          <AuthGuard permissions={[IAuthPermission.Media]}>
            <MediaRoute />
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
      {
        path: "/project-configs",
        element: (
          <AuthGuard permissions={[IAuthPermission.Projects]}>
            <ProjectConfigsRoute />
          </AuthGuard>
        ),
      },
      {
        path: "/project/:adapterType",
        element: (
          <AuthGuard permissions={[IAuthPermission.Projects]}>
            <ProjectRoute />
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
