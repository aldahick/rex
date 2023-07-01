import "typeface-open-sans";
import "@emotion/react";

import React from "react";
import { createRoot } from "react-dom/client";
import { RouteObject, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { config } from "./config";
import { Layout } from "./features/layout/Layout";
import { StoreProvider } from "./hooks";
import { CatRoute } from "./routes/cat.route";
import { LoginRoute } from "./routes/login.route";
import { MediaRoute } from "./routes/media.route";
import { NoteRoute } from "./routes/note.route";
import { NotesRoute } from "./routes/notes.route";
import { RootRoute } from "./routes/root.route";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Missing root element");
}
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <StoreProvider>
        <Layout />
      </StoreProvider>
    ),
    // TODO improve display
    errorElement: <p>Error</p>,
    children: [
      {
        path: "",
        element: <RootRoute />,
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "cat",
        element: <CatRoute />,
      },
      {
        path: "media",
        element: <MediaRoute />,
      },
      {
        path: "notes/:id",
        element: <NoteRoute />,
      },
      {
        path: "notes",
        element: <NotesRoute />,
      },
    ],
  },
];
const router = createBrowserRouter(routes, { basename: config.basePath });
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
