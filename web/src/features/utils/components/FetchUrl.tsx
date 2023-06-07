import { Typography } from "@material-ui/core";
import axios from "axios";
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
    axios.get(url)
      .then(r => setData(r.data))
      .catch(status.error);
    return (
      <Typography>
        Loading...
      </Typography>
    );
  }
  return children(data);
};
