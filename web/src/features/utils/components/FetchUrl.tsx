import { Typography } from "@mui/material";
import React, { useState } from "react";

import { useStatus } from "../../../hooks";

interface FetchUrlProps {
  children: (data: string) => JSX.Element;
  url: string;
}

export const FetchUrl: React.FC<FetchUrlProps> = ({ children, url }) => {
  const [data, setData] = useState<string>();
  const status = useStatus();

  if (data === undefined) {
    fetch(url)
      .then((r) => r.text())
      .then((r) => setData(r))
      .catch(status.error);
    return <Typography>Loading...</Typography>;
  }
  return children(data);
};
