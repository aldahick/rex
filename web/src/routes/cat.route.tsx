import React, { useState } from "react";

import { CatCanvas } from "../features/cat/CatCanvas";
import { CatSettings } from "../features/cat/CatSettings";
import { CatSettingsForm, getCatColors } from "../features/cat/CatSettingsForm";

export const CatRoute: React.FC = () => {
  const [settings, setSettings] = useState<CatSettings>({
    ...getCatColors(),
    speed: 5,
    radius: 16,
    count: 3,
    frameRate: 60,
  });

  return (
    <div>
      <CatSettingsForm value={settings} onChange={setSettings} />
      <CatCanvas settings={settings} />
    </div>
  );
};
