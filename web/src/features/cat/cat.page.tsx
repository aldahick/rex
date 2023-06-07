import * as _ from "lodash";
import React, { useCallback, useEffect, useRef } from "react";

import { useStatus } from "../../hooks";
import { XYCoord } from "../utils/XYCoord";

const DOT_SPEED = 5;
const DOT_RADIUS = 16;
const CANVAS_SIZE = {
  x: 800,
  y: 600
};
const DOT_COUNT = 3;
const START_ANGLES = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];

export const CatPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<(XYCoord & { theta: number })[]>(_.range(DOT_COUNT).map(() => ({
    x: _.random(CANVAS_SIZE.x),
    y: _.random(CANVAS_SIZE.y),
    theta: START_ANGLES[_.random(START_ANGLES.length)]
  })));
  const status = useStatus();

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      status.error("cannot get 2d rendering context");
      return;
    }
    console.log("render", dots.current);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    for (const dot of dots.current) {
      context.beginPath();
      context.fillStyle = "black";
      context.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    }
  }, [canvasRef, status, dots]);

  useEffect(() => {
    const interval = setInterval(() => {
      dots.current = dots.current.map(dot => {
        const newDot = {
          x: dot.x + DOT_SPEED * Math.cos(dot.theta),
          y: dot.y + DOT_SPEED * Math.sin(dot.theta),
          theta: dot.theta
        };
        const clamp = {
          x: _.clamp(newDot.x, DOT_RADIUS, CANVAS_SIZE.x - DOT_RADIUS),
          y: _.clamp(newDot.y, DOT_RADIUS, CANVAS_SIZE.y - DOT_RADIUS)
        };
        const thetaQuad1or3 = _.inRange(dot.theta, 0, Math.PI / 2) ||
          _.inRange(dot.theta, Math.PI, 3 * Math.PI / 2);
        if (clamp.x !== newDot.x) {
          newDot.x = clamp.x;
          newDot.theta += (Math.PI / 2) * (thetaQuad1or3 ? 1 : -1);
        }
        if (clamp.y !== newDot.y) {
          newDot.y = clamp.y;
          newDot.theta += (Math.PI / 2) * (thetaQuad1or3 ? -1 : 1);
        }
        newDot.theta = newDot.theta % (Math.PI * 2);
        return newDot;
      });
      render();
    }, 1000 / 60);
    return () => {
      clearInterval(interval);
    };
  }, [render]);

  return (
    <canvas width={CANVAS_SIZE.x} height={CANVAS_SIZE.y} ref={canvasRef} />
  );
};
