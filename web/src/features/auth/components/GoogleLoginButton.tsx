import { useMutation } from "@apollo/client";
import { makeStyles, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import { IAuthToken, IMutation, IMutationCreateAuthTokenGoogleArgs } from "../../../graphql";
import { useStatus } from "../../../hooks";

const useStyles = makeStyles(theme => ({
  loginButton: {
    fontWeight: "bold"
  },
  loginLabel: {
    fontWeight: 500,
    color: theme.palette.grey[600]
  }
}));

const MUTATION_CREATE_AUTH_TOKEN_GOOGLE = gql`
mutation Web_CreateAuthTokenGoogle($googleIdToken: String!) {
  authToken: createAuthTokenGoogle(googleIdToken: $googleIdToken, clientType: WEB) {
    token
    user {
      roles {
        name
        permissions {
          action
          resource
        }
      }
    }
  }
}
`;

export const GoogleLoginButton: React.FC<{
  clientId: string;
  onSuccess: (authToken: IAuthToken) => void;
}> = ({ clientId, onSuccess }) => {
  const [createAuthToken] = useMutation<{
    authToken: IMutation["createAuthTokenGoogle"];
  }, Omit<IMutationCreateAuthTokenGoogleArgs, "clientType">>(MUTATION_CREATE_AUTH_TOKEN_GOOGLE);
  const [isErrored, setIsErrored] = useState(false);
  const classes = useStyles();
  const status = useStatus();

  const onGoogleAuth = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): Promise<void> => {
    if ("code" in response) { // we don't support this
      status.error("You appear to be offline.");
      return;
    }
    try {
      const res = await createAuthToken({
        variables: {
          googleIdToken: response.tokenObj.id_token
        }
      });
      if (res.data) {
        onSuccess(res.data.authToken);
      } else {
        throw new Error("No token returned from API");
      }
    } catch (err) {
      status.error(err);
    }
  };

  if (isErrored) {
    return <span />;
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onGoogleAuth}
      className={classes.loginButton}
      onFailure={(err: {
        [key in "message" | "details" | "error"]: string | undefined
      }): void => {
        const message = err.message ?? err.details ?? err.error ?? "An unknown error occurred";
        console.error("GoogleLogin error", { message });
        setIsErrored(true);
      }}
    >
      <Typography className={classes.loginLabel}>
        Log In
      </Typography>
    </GoogleLogin>
  );
};
