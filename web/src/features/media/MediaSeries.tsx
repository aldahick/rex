import { Grid, Pagination } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useMediaItemQuery } from "../../graphql";
import { useStores } from "../../hooks";
import { FileTreeEntry, sortFileEntries } from "../file/FileTreeEntry";
import { mediaItemToEntry } from "./MediaBrowser";
import { MediaContentView } from "./MediaContentView";

interface MediaSeriesProps {
  entry: Pick<FileTreeEntry, "path">;
}

export const MediaSeries: React.FC<MediaSeriesProps> = observer(({ entry }) => {
  const { authStore } = useStores();
  const [index, setIndex] = useState(0);
  const itemResult = useMediaItemQuery({
    variables: {
      key: entry.path ?? "",
    },
  });

  if (
    !authStore.token ||
    itemResult.loading ||
    !itemResult.data ||
    !itemResult.data.mediaItem?.children
  ) {
    return null;
  }

  const children = itemResult.data.mediaItem?.children
    ?.map((item) => mediaItemToEntry(item))
    .toSorted(sortFileEntries);

  const handleClick = () => {
    setIndex((prev) => Math.min(children.length - 1, prev + 1));
  };

  const handlePageChange = (evt: React.ChangeEvent<unknown>, page: number) => {
    setIndex(page - 1);
  };

  const selected = children[index];

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Pagination
          page={index + 1}
          onChange={handlePageChange}
          count={children.length}
          sx={{ textAlign: "center" }}
        />
      </Grid>
      <Grid item>
        <MediaContentView
          entry={selected}
          token={authStore.token}
          onClick={handleClick}
        />
      </Grid>
    </Grid>
  );
});
