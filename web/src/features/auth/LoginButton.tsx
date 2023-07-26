import { Button } from "@mui/material";
import React from "react";

import { RexLink } from "../utils/RexLink";

export const LoginButton: React.FC = () => {
  return (
    <Button color="secondary" variant="outlined">
      <RexLink to="/login" color="inherit" fontWeight={600}>
        Log In
      </RexLink>
    </Button>
  );
};
