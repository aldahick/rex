import { Grid } from "@mui/material";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React, { useState } from "react";

import {
  IStorableAuthTokenFragment,
  useCreateAuthTokenGoogleMutation,
} from "../../graphql";
import { useStatus } from "../../hooks";

export const GoogleLoginButton: React.FC<{
  clientId: string;
  onSuccess: (authToken: IStorableAuthTokenFragment) => void;
}> = ({ clientId, onSuccess }) => {
  const [createAuthToken] = useCreateAuthTokenGoogleMutation();
  const [errored, setErrored] = useState(false);
  const status = useStatus();

  const handleSuccess = async (response: CredentialResponse): Promise<void> => {
    if (!response.credential) {
      status.error("No credential returned from Google OAuth");
      return;
    }
    try {
      const res = await createAuthToken({
        variables: {
          googleIdToken: response.credential,
        },
      });
      if (res.data) {
        onSuccess(res.data.authToken);
      } else if (res.errors) {
        throw res.errors[0];
      }
    } catch (err) {
      status.error(err);
    }
  };

  const handleError = () => {
    status.error("Failed to fetch OAuth token from Google. Not sure why!");
    setErrored(true);
  };

  if (errored) {
    return <span />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <div style={{ minWidth: "200px" }} />
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            size="large"
            context="signin"
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </GoogleOAuthProvider>
      </Grid>
    </Grid>
  );
};
