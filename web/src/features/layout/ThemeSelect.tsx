import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";

import { useStores } from "../../hooks";
import { Settings } from "../../store";

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderColor: "inherit",
    },
    "&:after": {
      borderColor: "inherit",
    },
    "& svg": {
      fill: "white",
    },
    "color": "inherit",
  },
});

export const ThemeSelect: React.FC = observer(() => {
  const { settingsStore } = useStores();
  const classes = useStyles();

  return (
    <Select
      className={classes.select}
      label="Theme"
      value={settingsStore.get("theme")}
      onChange={evt => settingsStore.set("theme", evt.target.value as Settings["theme"])}
    >
      <MenuItem value="light">
        Light
      </MenuItem>
      <MenuItem value="dark">
        Dark
      </MenuItem>
    </Select>
  );
});
