import React from "react";
import { createRoot } from "react-dom/client";
import { RouteObject, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { config } from "./config";
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
    element: <RootRoute />,
    errorElement: <p>Error</p>,
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/cat",
    element: <CatRoute />,
  },
  {
    path: "/media",
    element: <MediaRoute />,
  },
  {
    path: "/notes/:id",
    element: <NoteRoute />,
  },
  {
    path: "/notes",
    element: <NotesRoute />,
  },
];
const router = createBrowserRouter(routes, { basename: config.basePath });
createRoot(container).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
