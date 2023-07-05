import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useStatus, useStores } from "../../hooks";

export interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const status = useStatus();

  const handleLogout = () => {
    authStore.removeAuth();
    onLogout();
    status.info("Successfully logged out.");
    navigate("/");
  };

  return (
    <ListItem button onClick={handleLogout}>
      <ListItemText primary="Log Out" />
    </ListItem>
  );
};
