import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { config } from "../../config";
import { IStorableAuthTokenFragment } from "../../graphql";
import { useStatus, useStores } from "../../hooks";
import { DividerText } from "../utils/DividerText";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { LocalAuthForm } from "./LocalAuthForm";

export interface LoginFormProps {
  onSuccess: () => void;
  initialUsername?: string;
}

export const LoginForm: React.FC<LoginFormProps> = observer(
  ({ onSuccess, initialUsername }) => {
    const { authStore } = useStores();
    const { googleClientId } = config;
    const status = useStatus();

    const handleSuccess = ({
      token,
      user: { username, roles = [] },
    }: IStorableAuthTokenFragment) => {
      authStore.setToken({ token, roles });
      onSuccess();
      status.success(`Successfully logged in as ${username}!`);
    };

    return (
      <Grid container justifyContent="center" sx={{ mt: "1em" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <LocalAuthForm
            initialUsername={initialUsername}
            onSuccess={handleSuccess}
          />
          {googleClientId ? (
            <>
              <DividerText>OR</DividerText>
              <GoogleLoginButton
                clientId={googleClientId}
                onSuccess={handleSuccess}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
    );
  },
);
