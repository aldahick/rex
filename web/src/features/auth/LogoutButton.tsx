import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useStores } from "../../hooks";

export const LogoutButton: React.FC = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.removeAuth();
    navigate("/");
  };

  return (
    <ListItem button onClick={handleLogout}>
      <ListItemText primary="Log Out" />
    </ListItem>
  );
};
