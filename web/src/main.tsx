import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/util/Layout";
import { IndexRoute } from "./routes/_index";
import { CatRoute } from "./routes/cat";
import { LoginRoute } from "./routes/login";
import { LogoutRoute } from "./routes/logout";
import { MediaRoute } from "./routes/media.$";
import { ProjectRoute } from "./routes/project.$adapterType.($boardId).($sprintId)";
import ProjectsRoute from "./routes/projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <IndexRoute />,
      },
      {
        path: "cat",
        element: <CatRoute />,
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "logout",
        element: <LogoutRoute />,
      },
      {
        path: "media/*",
        element: <MediaRoute />,
      },
      {
        path: "project/:projectId/:boardId?/:sprintId?",
        element: <ProjectRoute />,
      },
      { path: "projects", element: <ProjectsRoute /> },
    ],
  },
]);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
