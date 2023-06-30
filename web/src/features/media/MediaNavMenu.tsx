import {
  Breadcrumbs,
  Button,
  Link,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { sortBy } from "lodash";
import React, { useEffect, useState } from "react";

import { IMediaItem, IMediaItemType } from "../../graphql";

const BreadcrumbLink = styled(Link)({
  cursor: "pointer",
});

interface MediaNavMenuProps {
  selected: IMediaItem[];
  options: IMediaItem[];
  onSelect: (item: IMediaItem) => void;
  onReset: (selected: IMediaItem[]) => void;
}

export const MediaNavMenu: React.FC<MediaNavMenuProps> = ({
  onSelect,
  onReset,
  selected,
  options,
}) => {
  const [current, setCurrent] = useState<IMediaItem>();

  useEffect(() => {
    setCurrent(options[0]);
  }, [options]);

  const lastSelected = selected.slice(-1)[0] as IMediaItem | undefined;

  return (
    <Breadcrumbs>
      {selected.map((item, i) => (
        <BreadcrumbLink
          key={item.key}
          onClick={() => onReset(selected.slice(0, i))}
        >
          <Typography>{item.key}</Typography>
        </BreadcrumbLink>
      ))}
      {(lastSelected?.type ?? IMediaItemType.Directory) ===
        IMediaItemType.Directory && (
        <>
          <Select
            value={current?.key ?? ""}
            onChange={(evt) =>
              setCurrent(options.find((i) => i.key === evt.target.value))
            }
          >
            {sortBy(options, (i) => i.key).map((item) => (
              <MenuItem value={item.key} key={item.key}>
                <Typography>{item.key}</Typography>
              </MenuItem>
            ))}
          </Select>
          <Button onClick={() => onSelect(current ?? options[0])}>List</Button>
        </>
      )}
    </Breadcrumbs>
  );
};
