import { makeStyles, Typography } from "@material-ui/core";
import * as mime from "mime";
import { observer } from "mobx-react";
import React from "react";
import { isIOS } from "react-device-detect";
import { container } from "tsyringe";

import { useStores } from "../../../hooks";
import { FetchUrl } from "../../utils/components/FetchUrl";
import { ConfigService } from "../../utils/config.service";

const useStyles = makeStyles({
  text: {
    whiteSpace: "pre-wrap",
  },
  image: {
    maxWidth: "100%",
  },
});

interface MediaContentViewProps {
  selectedKey: string;
  onClick?: () => void;
}

export const MediaContentView: React.FC<MediaContentViewProps> = observer(({ onClick, selectedKey }) => {
  const { authStore } = useStores();
  const config = container.resolve(ConfigService);
  const classes = useStyles();

  const mimeType = mime.getType(selectedKey);
  const contentUrl = `${config.apiUrl}/v1/media/content?key=${selectedKey}&token=${authStore.token ?? ""}`;

  switch (mimeType) {
    case "audio/mp4":
    case "audio/mpeg":
      return (
        <audio
          controls
          autoPlay
          src={contentUrl}
        />
      );
    case "video/mp4":
    case "video/quicktime":
      return (
        <video
          playsInline
          controls
          autoPlay
          muted={isIOS}
          src={contentUrl}
          className={classes.image}
        />
      );
    case "image/jpg":
    case "image/jpeg":
    case "image/png":
      return (
        <img
          alt={selectedKey}
          src={contentUrl}
          className={classes.image}
          {...(onClick ? { onClick } : { })}
        />
      );
    case "text/html":
    case "text/plain":
      return (
        <FetchUrl url={contentUrl}>
          {text => (
            mimeType === "text/html" ? (
              // eslint-disable-next-line react/no-danger,@typescript-eslint/naming-convention
              <Typography dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
              <Typography className={classes.text}>
                {text}
              </Typography>
            )
          )}
        </FetchUrl>
      );
    default:
      return (
        <Typography>
          Unknown MIME type
          {" "}
          {mimeType}
        </Typography>
      );
  }
});
