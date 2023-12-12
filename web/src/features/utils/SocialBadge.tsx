import { Grid, Link, Typography, TypographyProps } from "@mui/material";
import React from "react";

export interface SocialBadgeProps {
  label: string;
  imageUrl: string;
  url?: string;
  imageProps?: Partial<Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'>>;
  textColor?: TypographyProps["color"];
  size?: number;
}

export const SocialBadge: React.FC<SocialBadgeProps> = ({
  label,
  imageUrl,
  url,
  imageProps,
  textColor,
  size,
}) => (
  <Link href={url}>
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <img src={imageUrl} height={size ?? 32} {...imageProps} alt={label} />
      </Grid>
      {typeof label === "string" ? (
        <Grid item>
          <Typography color={textColor ?? "inherit"}>{label}</Typography>
        </Grid>
      ) : (
        label
      )}
    </Grid>
  </Link>
);
