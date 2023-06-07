import { Grid, Link, Typography, TypographyProps } from "@material-ui/core";
import React from "react";

export const SocialBadge: React.FC<{
  label?: React.ReactNode;
  imageUrl: string;
  url?: string;
  imageProps?: Partial<React.ImgHTMLAttributes<HTMLImageElement>>;
  textColor?: TypographyProps["color"];
  size?: number;
}> = ({
  label, imageUrl, url, imageProps, textColor, size
}) => (
  <Link href={url}>
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <img src={imageUrl} height={size ?? 32} alt="Logo" {...imageProps} />
      </Grid>
      {typeof label === "string" ? (
        <Grid item>
          <Typography color={textColor ?? "inherit"}>
            {label}
          </Typography>
        </Grid>
      ) : label}
    </Grid>
  </Link>
);
