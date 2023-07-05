import { Button, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const LoginButton: React.FC = () => {
  return (
    <Button color="secondary" variant="outlined">
      <Link
        component={RouterLink}
        to="/login"
        style={{
          fontWeight: 600,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Log In
      </Link>
    </Button>
  );
};
