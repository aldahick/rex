import { Grid } from "@mui/material";
import React from "react";

import { config } from "../../config";
import { IStorableAuthTokenFragment } from "../../graphql";
import { useStores } from "../../hooks";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { LocalAuthForm } from "./LocalAuthForm";

export interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { authStore } = useStores();
  const { googleClientId } = config;

  const handleSuccess = ({
    token,
    user: { roles = [] },
  }: IStorableAuthTokenFragment) => {
    authStore.setToken({ token, roles });
    onSuccess();
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ marginBottom: "1em" }}>
        <LocalAuthForm onSuccess={handleSuccess} />
      </Grid>
      <div style={{ textAlign: "center" }}>
        {googleClientId ? (
          <GoogleLoginButton
            clientId={googleClientId}
            onSuccess={handleSuccess}
          />
        ) : null}
      </div>
    </Grid>
  );
};
