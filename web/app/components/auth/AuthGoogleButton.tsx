import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useLoaderData, useSubmit } from "@remix-run/react";
import React from "react";
import { useStatus } from "../../hooks/useStatus.hook";
import { LoginLoader } from "../../routes/login";
import { objectToForm } from "../../utils/form.util";

export const AuthGoogleButton: React.FC = () => {
  const {
    config: { googleClientId },
  } = useLoaderData<LoginLoader>();
  const status = useStatus();
  const submit = useSubmit();

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      status.error("No credential returned from Google OAuth");
      return;
    }
    submit(
      objectToForm({
        provider: "google",
        idToken: response.credential,
      }),
      { method: "POST" },
    );
  };

  const handleError = () => {
    status.error("Failed to fetch OAuth token from Google. Not sure why!");
  };

  if (!googleClientId) {
    return null;
  }

  return (
    <GoogleOAuthProvider
      clientId={googleClientId}
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
