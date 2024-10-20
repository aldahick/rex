import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.hook";

export const LogoutRoute: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.set(undefined);
    navigate("/");
  }, []);

  return null;
};
