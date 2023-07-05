import React from "react";
import { useSearchParams } from "react-router-dom";

import { RegisterForm } from "../features/auth/RegisterForm";

export const RegisterRoute: React.FC = () => {
  const [params] = useSearchParams();
  return <RegisterForm initialUsername={params.get("username") ?? undefined} />;
};
