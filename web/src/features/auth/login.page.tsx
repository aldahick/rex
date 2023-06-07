import { Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { container } from "tsyringe";

import { IAuthToken } from "../../graphql";
import { useStores } from "../../hooks";
import { ConfigService } from "../utils/config.service";
import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { LocalAuthForm } from "./components/LocalAuthForm";

export const LoginPage: React.FC = observer(() => {
  const { authStore } = useStores();
  const [redirect, setRedirect] = useState(false);
  const { googleClientId = "" } = container.resolve(ConfigService);
  const params = new URLSearchParams(window.location.search);

  const handleLogin = ({ token, user }: IAuthToken) => {
    authStore.setToken({
      token,
      roles: user.roles ?? []
    });
    setRedirect(true);
  };

  if (redirect || authStore.isAuthenticated) {
    if (params.has("redirect")) {
      window.location.replace(params.get("redirect") ?? "/");
      return null;
    }
    return <Redirect to="/" />;
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
