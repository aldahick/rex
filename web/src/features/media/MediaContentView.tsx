import { Typography, styled } from "@mui/material";
import mime from "mime";
import type React from "react";
import { config } from "../../config";
import type { FileTreeEntry } from "../file/FileTreeEntry";
import { FetchUrl } from "../utils/FetchUrl";

const WrappedText = styled(Typography)({
  whiteSpace: "pre-wrap",
});

const MaxWidthImage = styled("img")({
  maxWidth: "100%",
});

const MaxWidthVideo = styled("video")({
  maxWidth: "100%",
});

interface MediaContentViewProps {
  entry: FileTreeEntry;
  token: string;
  onClick?: () => void;
}

export const MediaContentView: React.FC<MediaContentViewProps> = ({
  onClick,
  entry,
  token,
}) => {
  const key = entry.path ?? "";
  const mimeType = mime.getType(key);
  const params = new URLSearchParams({ key, token });
  const contentUrl = `${config.apiUrl}v1/media/content?${params.toString()}`;

  switch (mimeType) {
    case "audio/mp4":
    case "audio/mpeg":
      // biome-ignore lint/a11y/useMediaCaption: nope
      return <audio controls autoPlay src={contentUrl} />;
    case "application/mp4":
    case "video/mp4":
    case "video/quicktime":
      return <MaxWidthVideo playsInline controls autoPlay src={contentUrl} />;
    case "image/jpg":
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return (
        <MaxWidthImage
          alt={key}
          src={contentUrl}
          {...(onClick ? { onClick } : {})}
        />
      );
    case "text/html":
    case "text/plain":
      return (
        <FetchUrl url={contentUrl}>
          {(text) =>
            mimeType === "text/html" ? (
              // biome-ignore lint/security/noDangerouslySetInnerHtml: what do you even want
              <Typography dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
              <WrappedText>{text}</WrappedText>
            )
          }
        </FetchUrl>
      );
    default:
      return <Typography>Unknown MIME type {mimeType}</Typography>;
  }
};
