import { ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useStores } from "../../../hooks";

export const LogoutButton: React.FC = () => {
  const { authStore } = useStores();
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);

  useEffect(() => {
    if (shouldLogout) {
      authStore.removeAuth();
      window.location.href = "/";
    }
  }, [authStore, shouldLogout]);

  return (
    <ListItem button onClick={() => setShouldLogout(true)}>
      <ListItemText primary="Log Out" />
    </ListItem>
  );
};
