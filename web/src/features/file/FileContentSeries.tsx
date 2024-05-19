import { Grid, Pagination } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStores } from "../../hooks";
import { MediaContentView } from "../media/MediaContentView";
import { FileTreeEntry, sortFileEntries } from "./FileTreeEntry";

interface FileContentSeriesProps {
  entry: FileTreeEntry;
}

export const FileContentSeries: React.FC<FileContentSeriesProps> = observer(
  ({ entry }) => {
    const { authStore } = useStores();
    const [index, setIndex] = useState(0);

    if (!(authStore.token && entry.fetched)) {
      return null;
    }

    const children = entry.children.toSorted(sortFileEntries);

    const handleClick = () => {
      setIndex((prev) => Math.min(children.length - 1, prev + 1));
      window.scrollTo(0, 0);
    };

    const handlePageChange = (
      evt: React.ChangeEvent<unknown>,
      page: number,
    ) => {
      setIndex(page - 1);
      window.scrollTo(0, 0);
    };

    const selected = children[index];

    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <MediaContentView
            entry={selected}
            token={authStore.token}
            onClick={handleClick}
          />
        </Grid>
        <Grid item>
          <Pagination
            page={index + 1}
            onChange={handlePageChange}
            count={children.length}
            sx={{ textAlign: "center" }}
          />
        </Grid>
      </Grid>
    );
  },
);
