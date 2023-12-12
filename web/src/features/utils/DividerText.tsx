import { Typography, styled } from "@mui/material";
import React, { PropsWithChildren } from "react";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Line = styled("div")({
  width: "100%",
  border: "1px solid lightgray",
});

const Text = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  color: "lightgray",
}));

export interface DividerTextProps extends PropsWithChildren {
  /** defaults to lightgray */
  color?: string;
}

export const DividerText: React.FC<DividerTextProps> = ({
  children,
  color = "lightgray",
}) => (
  <Container>
    <Line style={{ borderColor: color }} />
    <Text variant="h6">{children}</Text>
    <Line style={{ borderColor: color }} />
  </Container>
);
