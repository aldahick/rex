import { Grid } from "@mui/material";
import React from "react";

import { config } from "../../config";
import { IStorableAuthTokenFragment } from "../../graphql";
import { useStores } from "../../hooks";
import { DividerText } from "../utils/DividerText";
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
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <LocalAuthForm onSuccess={handleSuccess} />
            <DividerText>OR</DividerText>
            {googleClientId ? (
              <GoogleLoginButton
                clientId={googleClientId}
                onSuccess={handleSuccess}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
