import { Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router";

import { Layout } from "../features/layout/Layout";

export const ErrorRoute: React.FC = () => {
  let error = useRouteError();

  if (
    typeof error === "object" &&
    !!error &&
    "error" in error &&
    typeof error.error === "object"
  ) {
    error = error.error;
  }

  console.error(error);
  const message =
    !!error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : String(error);

  if (message.startsWith('No route matches URL "')) {
    return (
      <Layout>
        <Typography textAlign="center" variant="h4" color="error">
          404
        </Typography>
        <Typography textAlign="center" variant="h6">
          Page not found: {message.match(/"([^"]+)"/)?.[1]}
        </Typography>
      </Layout>
    );
  }
  const isDark = document.body.style.background === "rgb(18, 18, 18)";

  return (
    <div style={{ color: isDark ? "orange" : "red" }}>
      An unexpected error occurred: {message}
    </div>
  );
};
