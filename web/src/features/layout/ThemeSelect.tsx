import { MenuItem, Select, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { useStores } from "../../hooks";
import { Settings, ThemeSetting } from "../../store/settings.store";

const NavbarSelect = styled(Select)({
  "&:before": {
    borderColor: "inherit",
  },
  "&:after": {
    borderColor: "inherit",
  },
  "& svg": {
    fill: "white",
  },
  color: "inherit",
});

export const ThemeSelect: React.FC = observer(() => {
  const { settingsStore } = useStores();

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    settingsStore.set("theme", evt.target.value as Settings["theme"]);
  };

  return (
    <NavbarSelect
      label="Theme"
      value={settingsStore.get("theme")}
      onChange={handleChange}
    >
      {Object.entries(ThemeSetting).map(([label, value]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </NavbarSelect>
  );
});
