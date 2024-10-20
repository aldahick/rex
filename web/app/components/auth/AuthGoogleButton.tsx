import { IAuthTokenFragment } from "@aldahick/rex-sdk";
import { useGetAuthTokenLazyQuery } from "@aldahick/rex-sdk/react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { config } from "../../config";
import { useStatus } from "../../hooks/useStatus.hook";

export const AuthGoogleButton: React.FC<{
  onLogin: (token: IAuthTokenFragment) => void;
}> = ({ onLogin }) => {
  const [getAuthToken] = useGetAuthTokenLazyQuery();
  const status = useStatus();

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      status.danger("No credential returned from Google OAuth");
      return;
    }
    getAuthToken({
      variables: { params: { google: { idToken: response.credential } } },
      onCompleted: ({ authToken }) => onLogin(authToken),
    });
  };

  const handleError = () => {
    status.danger("Failed to fetch OAuth token from Google. Not sure why!");
  };

  return (
    <GoogleOAuthProvider
      clientId={config.googleClientId}
      onScriptLoadError={handleError}
    >
      <GoogleLogin
        size="large"
        context="signin"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};
