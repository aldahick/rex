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
      } else {
        throw new Error("No token returned from API");
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
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};
