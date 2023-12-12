import HomeIcon from "@mui/icons-material/Home";
import ExpandCloseIcon from "@mui/icons-material/KeyboardArrowLeft";
import ExpandOpenIcon from "@mui/icons-material/KeyboardArrowRight";
import { Collapse, Grid, IconButton, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useStores } from "../../hooks";
import { ThemeSetting } from "../../store/settings.store";
import { CatSettings } from "./CatSettings";

export const getCatColors = (theme?: ThemeSetting) =>
  theme === ThemeSetting.Light || !theme
    ? {
        color: "#121212",
        backgroundColor: "white",
      }
    : {
        color: "white",
        backgroundColor: "#121212",
      };

export interface CatSettingsProps {
  value: CatSettings;
  onChange: (value: CatSettings) => void;
}

export const CatSettingsForm: React.FC<CatSettingsProps> = observer(
  ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const { settingsStore } = useStores();

    const theme = settingsStore.get("theme");
    useEffect(() => {
      onChange({
        ...value,
        ...getCatColors(theme),
      });
    }, [theme, value, onChange]);

    const handleNumberChange =
      (field: "count" | "speed" | "radius" | "frameRate") =>
      (evt: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(evt.target.value);
        if (!Number.isNaN(newValue)) {
          onChange({ ...value, [field]: newValue });
        }
      };

    const handleExpand = () => {
      setOpen((prev) => !prev);
    };

    const ExpandIcon = open ? ExpandCloseIcon : ExpandOpenIcon;
    return (
      <Grid container alignItems="center" sx={{ pl: "1em", pr: "1em" }}>
        <IconButton onClick={handleExpand}>
          <ExpandIcon />
        </IconButton>
        <Collapse in={open} orientation="horizontal">
          <div style={{ display: "flex" }}>
            <TextField
              label="Number of dots"
              size="small"
              type="number"
              value={value.count}
              onChange={handleNumberChange("count")}
            />
            <TextField
              label="Dot speed (pixels per frame)"
              size="small"
              type="number"
              value={value.speed}
              onChange={handleNumberChange("speed")}
            />
            <TextField
              label="Dot radius (pixels)"
              size="small"
              type="number"
              value={value.radius}
              onChange={handleNumberChange("radius")}
            />
            <TextField
              label="Frame rate (per second)"
              size="small"
              type="number"
              value={value.frameRate}
              onChange={handleNumberChange("frameRate")}
            />
          </div>
        </Collapse>
        <Grid item flexGrow={1} />
        <Grid item>
          <Link to="/">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    );
  },
);
