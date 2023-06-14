import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { redirect } from "react-router";

import { config } from "../../config";
import { IStorableAuthTokenFragment } from "../../graphql";
import { useStores } from "../../hooks";
import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { LocalAuthForm } from "./components/LocalAuthForm";

export const LoginPage: React.FC = observer(() => {
  const { authStore } = useStores();
  const [redirecting, setRedirecting] = useState(false);
  const { googleClientId = "" } = config;
  const params = new URLSearchParams(window.location.search);

  const handleLogin = ({ token, user }: IStorableAuthTokenFragment) => {
    authStore.setToken({
      token,
      roles: user.roles ?? [],
    });
    setRedirecting(true);
  };

  if (redirecting || authStore.isAuthenticated) {
    if (params.has("redirect")) {
      window.location.replace(params.get("redirect") ?? "/");
      return null;
    }
    return redirect("/");
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ marginBottom: "1em" }}>
        <LocalAuthForm onSuccess={handleLogin} />
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} />
        <Grid item sm={6}>
          {googleClientId && (
            <GoogleLoginButton
              clientId={googleClientId}
              onSuccess={handleLogin}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
});
