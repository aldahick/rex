import React, { useCallback, useEffect, useState } from "react";

import { CatGame } from "./CatGame";
import { CatSettings } from "./CatSettings";

export interface CatCanvasProps {
  settings: CatSettings;
}

/**
 * Displays a moving dot, because that's all it takes to entertain my cat
 */
export const CatCanvas: React.FC<CatCanvasProps> = ({ settings }) => {
  const [game, setGame] = useState<CatGame>();

  const handleRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) {
      if (game) {
        game.stop();
        setGame(undefined);
      }
      return;
    }
    const newGame = new CatGame(canvas, settings);
    newGame.start();
    setGame(newGame);
  }, []);

  useEffect(() => {
    if (game) {
      game.setSettings(settings);
    }
  }, [settings]);

  return (
    <canvas
      ref={handleRef}
      width={window.innerWidth - 1}
      height={window.innerHeight - 160}
    />
  );
};
