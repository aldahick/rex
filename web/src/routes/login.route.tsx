import React from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../features/auth/LoginForm";

export const LoginRoute: React.FC = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const initialUsername = params.get("username") ?? undefined;
  const handleSuccess = () => {
    const redirectTo = params.get("redirect") ?? "/";
    navigate(redirectTo);
  };

  return (
    <LoginForm initialUsername={initialUsername} onSuccess={handleSuccess} />
  );
};
