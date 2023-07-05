import { Grid, Typography } from "@mui/material";
import React from "react";

import { CreateUserForm } from "./CreateUserForm";

export interface RegisterFormProps {
  initialUsername?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  initialUsername,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography textAlign="center" variant="h3" marginBottom="1em">
              Sign Up
            </Typography>
            <CreateUserForm initialUsername={initialUsername} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
