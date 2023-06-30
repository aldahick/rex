import AddIcon from "@mui/icons-material/Add";
import { Fab, styled } from "@mui/material";
import React from "react";

const FixedFab = styled(Fab)({
  position: "fixed",
  right: "1em",
  bottom: "1em",
});

export const AddButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <FixedFab color="primary" onClick={onClick}>
      <AddIcon />
    </FixedFab>
  );
};
