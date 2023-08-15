import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { useStores } from "../hooks";

export const LogoutRoute: React.FC = observer(() => {
  const navigate = useNavigate();
  const { authStore } = useStores();

  useEffect(() => {
    authStore.removeAuth();
    navigate("/");
  }, []);

  return <Typography>Logging out and redirecting...</Typography>;
});
