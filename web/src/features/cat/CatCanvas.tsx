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
    const game = new CatGame(canvas, settings);
    game.start();
    setGame(game);
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
