import React from "react";
import { CatCanvas } from "../features/cat/CatCanvas";

export const CatRoute: React.FC = () => {
  return (
    <div style={{ marginTop: "1em" }}>
      <CatCanvas />
    </div>
  );
};
