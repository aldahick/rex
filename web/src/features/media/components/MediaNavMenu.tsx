import {
  Breadcrumbs, Button, Link, makeStyles,
  MenuItem, Select, Typography,
} from "@material-ui/core";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";

import { IMediaItem, IMediaItemType } from "../../../graphql";

const useStyles = makeStyles({
  breadcrumbLink: {
    cursor: "pointer",
  },
});

interface MediaNavMenuProps {
  selected: IMediaItem[];
  options: IMediaItem[];
  onSelect: (item: IMediaItem) => void;
  onReset: (selected: IMediaItem[]) => void;
}

export const MediaNavMenu: React.FC<MediaNavMenuProps> = ({
  onSelect, onReset, selected, options,
}) => {
  const [current, setCurrent] = useState<IMediaItem>();
  const classes = useStyles();

  useEffect(() => {
    setCurrent(options[0]);
  }, [options]);

  const lastSelected = selected.slice(-1)[0] as IMediaItem | undefined;

  return (
    <Breadcrumbs>
      {selected.map((item, i) => (
        <Link className={classes.breadcrumbLink} key={item.key} onClick={() => onReset(selected.slice(0, i))}>
          <Typography>
            {item.key}
          </Typography>
        </Link>
      ))}
      {(lastSelected?.type ?? IMediaItemType.Directory) === IMediaItemType.Directory && (
        <>
          <Select
            value={current?.key ?? ""}
            onChange={evt => setCurrent(options.find(i => i.key === evt.target.value))}
          >
            {_.sortBy(options, i => i.key).map(item => (
              <MenuItem value={item.key} key={item.key}>
                <Typography>
                  {item.key}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          <Button onClick={() => onSelect(current ?? options[0])}>
            List
          </Button>
        </>
      )}
    </Breadcrumbs>
  );
};
