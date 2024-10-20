import { IAuthTokenFragment } from "@aldahick/rex-sdk";
import { useGetConfigQuery } from "@aldahick/rex-sdk/react";
import React from "react";
import { useNavigate } from "react-router";
import { AuthGoogleButton } from "../components/auth/AuthGoogleButton";
import { AuthLoginForm } from "../components/auth/AuthLoginForm";
import { DividerText } from "../components/util/DividerText";
import { FormContainer } from "../components/util/FormContainer";
import { useAuth } from "../hooks/useAuth.hook";

export const LoginRoute: React.FC = () => {
  const { data } = useGetConfigQuery();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = (token: IAuthTokenFragment) => {
    auth.set(token);
    navigate("/");
  };

  return (
    <FormContainer title="Log In">
      <AuthLoginForm config={data?.config} onLogin={handleLogin} />
      {data && (
        <>
          <DividerText>OR</DividerText>
          <AuthGoogleButton onLogin={handleLogin} />
        </>
      )}
    </FormContainer>
  );
};
