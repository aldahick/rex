import { styled, Typography } from "@mui/material";
import * as mime from "mime";
import { observer } from "mobx-react-lite";
import React from "react";

import { config } from "../../config";
import { useStores } from "../../hooks";
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
  selectedKey: string;
  onClick?: () => void;
}

export const MediaContentView: React.FC<MediaContentViewProps> = observer(
  ({ onClick, selectedKey }) => {
    const { authStore } = useStores();

    const mimeType = mime.getType(selectedKey);
    const params = new URLSearchParams({
      key: selectedKey,
      token: authStore.token ?? "",
    });
    const contentUrl = config.apiUrl + "v1/media/content?" + params.toString();

    switch (mimeType) {
      case "audio/mp4":
      case "audio/mpeg":
        return <audio controls autoPlay src={contentUrl} />;
      case "video/mp4":
      case "video/quicktime":
        return <MaxWidthVideo playsInline controls autoPlay src={contentUrl} />;
      case "image/jpg":
      case "image/jpeg":
      case "image/png":
        return (
          <MaxWidthImage
            alt={selectedKey}
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
                // eslint-disable-next-line react/no-danger,@typescript-eslint/naming-convention
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
  }
);
