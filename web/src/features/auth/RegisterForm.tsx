import { Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { CreateUserForm } from "./CreateUserForm";

export interface RegisterFormProps {
  initialUsername?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  initialUsername,
}) => {
  const navigate = useNavigate();
  const handleCreate = (username: string) => {
    navigate(`/login?username=${username}`);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography textAlign="center" variant="h3" marginBottom="1em">
              Sign Up
            </Typography>
            <CreateUserForm
              initialUsername={initialUsername}
              onCreate={handleCreate}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
