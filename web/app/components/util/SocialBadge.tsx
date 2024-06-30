import { Link } from "@remix-run/react";
import React from "react";

export interface SocialBadgeProps {
  label: string;
  imageUrl: string;
  url: string;
  imageProps?: Partial<React.ImgHTMLAttributes<HTMLImageElement>>;
  textColor?: string;
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
  <Link to={url}>
    <div className="flex flex-col items-center">
      <div>
        <img
          src={imageUrl}
          {...imageProps}
          alt={imageProps?.alt ?? label}
          style={{ ...imageProps?.style, height: size ?? 32 }}
        />
      </div>
      {typeof label === "string" ? (
        <div>
          <span color={textColor}>{label}</span>
        </div>
      ) : (
        label
      )}
    </div>
  </Link>
);
