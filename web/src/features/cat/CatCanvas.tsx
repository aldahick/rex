import React, { useEffect, useRef } from "react";

import { CatGame } from "./CatGame";

export interface CatCanvasProps {
  count?: number;
  speed?: number;
  radius?: number;
}

/**
 * Displays a moving dot, because that's all it takes to entertain my cat
 */
export const CatCanvas: React.FC<CatCanvasProps> = ({
  speed = 5,
  radius = 16,
  count = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const game = new CatGame(canvasRef.current, speed, radius, count);
      game.start();
      return () => {
        game.stop();
      };
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};
