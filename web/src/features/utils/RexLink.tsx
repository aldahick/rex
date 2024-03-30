import { LinkProps, Link as MuiLink, styled } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const PlainLink = styled(MuiLink)({
  textDecoration: "none",
  cursor: "pointer",
}) as typeof MuiLink;

export type RexLinkProps = LinkProps<typeof RouterLink>;

/**
 * A MUI link using a react-router link, with some styles for good measure
 */
export const RexLink: React.FC<RexLinkProps> = (props) => (
  <PlainLink component={RouterLink} {...props} />
);
