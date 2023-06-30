import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router";

import { LoginForm } from "../features/auth/LoginForm";

export const LoginRoute: React.FC = observer(() => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const handleSuccess = () => {
    const url = params.get("redirect") ?? "/";
    navigate(url);
  };

  return <LoginForm onSuccess={handleSuccess} />;
});
