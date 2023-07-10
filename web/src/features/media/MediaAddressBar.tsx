import { Breadcrumbs, Link, styled } from "@mui/material";
import React, { Fragment, useState } from "react";

const BreadcrumbLink = styled(Link)({
  cursor: "pointer",
});

export const MediaAddressBar: React.FC = () => {
  const [dir, setDir] = useState("");

  const parts = dir.split("/");

  const handlePartClick = (partIndex: number) => () => {
    setDir(parts.slice(0, partIndex).join("/"));
  };

  return (
    <div>
      <Breadcrumbs>
        {parts.map((part, index) => (
          <Fragment key={part}>
            /
            <BreadcrumbLink onClick={handlePartClick(index)}>
              {part}
            </BreadcrumbLink>
          </Fragment>
        ))}
      </Breadcrumbs>
    </div>
  );
};
