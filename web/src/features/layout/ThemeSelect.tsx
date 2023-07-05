import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { useStores } from "../../hooks";
import { Settings, ThemeSetting } from "../../store/settings.store";

const themeIcons: Record<ThemeSetting, React.FC> = {
  [ThemeSetting.Dark]: DarkModeIcon,
  [ThemeSetting.Light]: LightModeIcon,
};

export interface ThemeSelectProps {
  type: "select" | "button";
}

const entries = Object.entries(ThemeSetting);

export const ThemeSelect: React.FC<ThemeSelectProps> = observer(({ type }) => {
  const { settingsStore } = useStores();

  const value = settingsStore.get("theme");

  const handleChange = (evt: SelectChangeEvent<unknown>) => {
    settingsStore.set("theme", evt.target.value as Settings["theme"]);
  };

  if (type === "button") {
    const index = entries.findIndex(([, v]) => v === value);
    const nextIndex = index === entries.length - 1 ? 0 : index + 1;
    const nextValue = entries[nextIndex][1];
    const handleClick = () => {
      settingsStore.set("theme", nextValue);
    };
    const Icon = themeIcons[nextValue];
    return (
      <IconButton onClick={handleClick}>
        <Icon />
      </IconButton>
    );
  }

  return (
    <Select label="Theme" value={value} onChange={handleChange}>
      {entries.map(([label, value]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
});
