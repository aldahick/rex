import React, { useState } from "react";
import { useStores } from "../../hooks";
import { ThemeSetting } from "../../store/settings.store";
import { CatGame } from "./CatGame";

const getCatColors = (theme?: ThemeSetting) =>
  theme === ThemeSetting.Light || !theme
    ? {
        color: "#121212",
        backgroundColor: "white",
      }
    : {
        color: "white",
        backgroundColor: "#121212",
      };

/**
 * Displays a moving dot, because that's all it takes to entertain my cat
 */
export const CatCanvas: React.FC = () => {
  const { settingsStore } = useStores();
  const [game] = useState(
    new CatGame({
      ...getCatColors(settingsStore.get("theme")),
      speed: 5,
      radius: 16,
      count: 3,
      frameRate: 60,
    }),
  );

  const handleRef = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      game.start(canvas);
    } else {
      game.stop();
    }
  };

  return (
    <canvas
      ref={handleRef}
      width={window.innerWidth - 1}
      height={window.innerHeight - 160}
    />
  );
};
