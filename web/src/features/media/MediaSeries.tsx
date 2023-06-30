import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

import { IMediaItem } from "../../graphql";
import { MediaContentView } from "./MediaContentView";

interface MediaSeriesProps {
  selectedKey: string;
  items: IMediaItem[];
}

export const MediaSeries: React.FC<MediaSeriesProps> = ({
  selectedKey,
  items,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeSetIndex = (value: number) => {
    setCurrentIndex(Math.min(Math.max(value, 0), items.length - 1));
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-around">
          <Grid item>
            <IconButton onClick={() => safeSetIndex(currentIndex - 1)}>
              <ArrowLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>
              {currentIndex + 1} / {items.length}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => safeSetIndex(currentIndex + 1)}>
              <ArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <MediaContentView
          onClick={() => safeSetIndex(currentIndex + 1)}
          selectedKey={`${selectedKey}/${items[currentIndex].key}`}
        />
      </Grid>
    </Grid>
  );
};
