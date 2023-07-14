import React from "react";

import { HexSelect } from "../utils/HexSelect";

export const HomeLinks: React.FC = () => {
  return (
    <HexSelect>
      {{
        topLeft: () => <div style={{ backgroundColor: "green" }} />,
        topCenter: () => <div style={{ backgroundColor: "blue" }} />,
        topRight: () => <div style={{ backgroundColor: "purple" }} />,
        bottomLeft: () => <div style={{ backgroundColor: "yellow" }} />,
        bottomCenter: () => <div style={{ backgroundColor: "orange" }} />,
        bottomRight: () => <div style={{ backgroundColor: "red" }} />,
      }}
    </HexSelect>
  );
};
