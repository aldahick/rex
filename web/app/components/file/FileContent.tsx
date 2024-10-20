import { IMediaItem } from "@aldahick/rex-sdk";
import mime from "mime";
import React from "react";
import { Await, useAsyncValue } from "react-router-dom";
import { config } from "../../config";
import { useAuth } from "../../hooks/useAuth.hook";

const TextContent: React.FC<{ mimeType: string }> = ({ mimeType }) => {
  const text = useAsyncValue() as string;

  return mimeType === "text/html" ? (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: what do you even want
    <span dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    <span className="whitespace-pre-wrap">{text}</span>
  );
};

export const FileContent: React.FC<{
  item: IMediaItem;
  onClick?: () => void;
}> = ({ item, onClick }) => {
  const auth = useAuth();
  const mimeType = mime.getType(item.key);
  const params = new URLSearchParams({
    key: item.key,
    token: auth.token?.token ?? "",
  });
  const contentUrl = `${config.apiUrl}/v1/media/content?${params}`;

  switch (mimeType) {
    case "audio/mp4":
    case "audio/mpeg":
      // biome-ignore lint/a11y/useMediaCaption: nope
      return <audio controls autoPlay src={contentUrl} />;
    case "application/mp4":
    case "video/mp4":
    case "video/quicktime":
      return (
        // biome-ignore lint/a11y/useMediaCaption: nope
        <video
          playsInline
          controls
          autoPlay
          src={contentUrl}
          style={{ maxWidth: "100%" }}
        />
      );
    case "image/jpg":
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return (
        <img
          alt={item.key}
          src={contentUrl}
          onClick={onClick}
          onKeyUp={onClick}
          style={{ maxWidth: "100%" }}
        />
      );
    case "text/html":
    case "text/plain": {
      return (
        <Await resolve={fetch(contentUrl).then((r) => r.text())}>
          <TextContent mimeType={mimeType} />
        </Await>
      );
    }
    default:
      return <span>Unknown MIME type {mimeType}</span>;
  }
};
