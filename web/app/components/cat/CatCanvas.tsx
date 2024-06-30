import React, { useState } from "react";
import { CatGame } from "./CatGame";

/**
 * Displays a moving dot, because that's all it takes to entertain my cat
 */
export const CatCanvas: React.FC = () => {
  const [game] = useState(
    new CatGame({
      color: "white",
      backgroundColor: "#121212",
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
