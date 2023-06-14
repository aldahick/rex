import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Root } from "./routes/root.route";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Missing root element");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Error</p>,
  },
]);
createRoot(container).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
