import { Grid } from "@mui/material";
import { sortBy } from "lodash";
import React, { useState } from "react";

import { IMediaItem, IMediaItemType, useMediaItemsQuery } from "../../graphql";
import { MediaContentView } from "./MediaContentView";
import { MediaNavMenu } from "./MediaNavMenu";
import { MediaSeries } from "./MediaSeries";

export const MediaBrowser: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<IMediaItem[]>([]);
  const itemsResult = useMediaItemsQuery({
    variables: {
      dir: selectedItems
        .filter((i) => i.type !== IMediaItemType.File)
        .map((i) => i.key)
        .join("/"),
    },
  });

  const lastSelected = selectedItems.slice(-1)[0] as IMediaItem | undefined;
  const selectedType = lastSelected?.type ?? IMediaItemType.Directory;
  const selectedKey = () => selectedItems.map((i) => i.key).join("/");

  const items = itemsResult.data?.mediaItems ?? [];
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <MediaNavMenu
          selected={selectedItems}
          options={items}
          onSelect={(item) => setSelectedItems([...selectedItems, item])}
          onReset={(items) => setSelectedItems(items)}
        />
      </Grid>
      {selectedType === IMediaItemType.File && (
        <Grid item>
          <MediaContentView selectedKey={selectedKey()} />
        </Grid>
      )}
      {selectedType === IMediaItemType.Series && (
        <Grid item>
          <MediaSeries
            selectedKey={selectedKey()}
            items={sortBy(items, ({ key }) => Number(key.split(".")[0]))}
          />
        </Grid>
      )}
    </Grid>
  );
};
