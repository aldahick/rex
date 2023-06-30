import { clamp, random, range } from "lodash";

import { XYCoord } from "../utils/XYCoord";

const startAngles = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];

type Dot = XYCoord & {
  theta: number;
};

export interface CatGameOptions {
  canvas: HTMLCanvasElement;
  count: number;
  speed: number;
  radius: number;
}

export class CatGame {
  private readonly context: CanvasRenderingContext2D;
  private readonly dots: Dot[];

  private interval?: NodeJS.Timeout;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly speed: number,
    private readonly radius: number,
    count: number
  ) {
    this.canvas = canvas;
    this.speed = speed;
    this.radius = radius;
    canvas.width = window.innerWidth - 1;
    canvas.height = window.innerHeight - 1;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("literally can't render anything. neat");
    }
    this.context = context;

    this.dots = range(count).map(() => ({
      x: random(canvas.width),
      y: random(canvas.height),
      theta: startAngles[random(startAngles.length)],
    }));
  }

  start() {
    this.interval = setInterval(() => {
      this.update();
      this.render();
    }, 1000 / 60);
  }

  stop() {
    console.log("clearing interval", this.interval);
    clearInterval(this.interval);
  }

  update() {
    for (const dot of this.dots) {
      dot.x += this.speed * Math.cos(dot.theta);
      dot.y += this.speed * Math.sin(dot.theta);
      // the dot has moved to somewhere, now bounce off walls instead of passing through
      const thetaOddQuadrant =
        (dot.theta >= 0 && dot.theta < Math.PI / 2) ||
        (dot.theta >= Math.PI && dot.theta <= (3 / 2) * Math.PI);
      const clamped = {
        x: clamp(dot.x, this.radius, this.canvas.width - this.radius),
        y: clamp(dot.y, this.radius, this.canvas.height - this.radius),
      };
      if (clamped.x !== dot.x) {
        dot.x = clamped.x;
        dot.theta += (Math.PI / 2) * (thetaOddQuadrant ? 1 : -1);
      }
      if (clamped.y !== dot.y) {
        dot.y = clamped.y;
        dot.theta += (Math.PI / 2) * (thetaOddQuadrant ? -1 : 1);
      }
      // clamp theta to (0, 2*pi). just makes it easier
      dot.theta %= Math.PI * 2;
    }
  }

  render() {
    const { canvas, context, radius } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    for (const dot of this.dots) {
      context.beginPath();
      context.fillStyle = "black";
      context.arc(dot.x, dot.y, radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    }
  }
}
