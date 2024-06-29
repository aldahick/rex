import { Grid } from "@mui/material";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React, { useState } from "react";
import {
  IStorableAuthTokenFragment,
  useGetAuthTokenLazyQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";

export const GoogleLoginButton: React.FC<{
  clientId: string;
  onSuccess: (authToken: IStorableAuthTokenFragment) => void;
}> = ({ clientId, onSuccess }) => {
  const [getAuthToken] = useGetAuthTokenLazyQuery();
  const [errored, setErrored] = useState(false);
  const status = useStatus();

  const handleSuccess = async (response: CredentialResponse): Promise<void> => {
    if (!response.credential) {
      status.error("No credential returned from Google OAuth");
      return;
    }
    try {
      const res = await getAuthToken({
        variables: {
          params: {
            google: { idToken: response.credential },
          },
        },
      });
      console.log(res);
      if (res.data) {
        onSuccess(res.data.authToken);
      } else if (res.error) {
        throw res.error;
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

  console.log(clientId);

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <div style={{ minWidth: "200px" }} />
        <GoogleOAuthProvider
          clientId={clientId}
          onScriptLoadError={handleError}
        >
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
