import { clamp, range } from "remeda";
import { XYCoord } from "../utils/XYCoord";
import { CatSettings } from "./CatSettings";

const randomInt = (max: number) => Math.floor(Math.random() * max);

const startAngles = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];

type Dot = XYCoord & {
  theta: number;
};

export class CatGame {
  private readonly dots: Dot[] = [];

  private interval?: NodeJS.Timeout;

  constructor(private settings: CatSettings) {}

  start(canvas: HTMLCanvasElement) {
    if (!this.settings) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("literally can't render anything. neat");
    }
    this.dots.push(
      ...range(0, this.settings.count).map(() => this.randomDot(canvas)),
    );
    this.startInterval(context);
  }

  startInterval(context: CanvasRenderingContext2D) {
    if (!this.settings) {
      return;
    }
    this.interval = setInterval(() => {
      this.update(context.canvas);
      this.render(context);
    }, 1000 / this.settings.frameRate);
  }

  stop() {
    this.stopInterval();
    this.dots.splice(0, this.dots.length);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  swapPalette() {
    const newBackground = this.settings.color;
    this.settings.color = this.settings.backgroundColor;
    this.settings.backgroundColor = newBackground;
  }

  randomDot(canvas: HTMLCanvasElement): Dot {
    return {
      x: randomInt(canvas.width),
      y: randomInt(canvas.height),
      theta: startAngles[randomInt(startAngles.length)],
    };
  }

  /** runs every frame to change dot positions based on velocity and walls */
  update(canvas: HTMLCanvasElement) {
    const { speed, radius } = this.settings;
    const maxX = canvas.width - radius;
    const maxY = canvas.height - radius;
    for (const dot of this.dots) {
      dot.x += speed * Math.cos(dot.theta);
      dot.y += speed * Math.sin(dot.theta);
      // the dot has moved to somewhere, now bounce off walls instead of passing through
      const thetaOddQuadrant =
        (dot.theta >= 0 && dot.theta < Math.PI / 2) ||
        (dot.theta >= Math.PI && dot.theta <= (3 / 2) * Math.PI);
      const clamped = {
        x: clamp(dot.x, { min: radius, max: maxX }),
        y: clamp(dot.y, { min: radius, max: maxY }),
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

  /** runs every frame to draw dots (and background) to canvas */
  render(context: CanvasRenderingContext2D) {
    const { backgroundColor, color, radius } = this.settings;
    const { width, height } = context.canvas;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
    context.closePath();

    context.fillStyle = color;
    for (const dot of this.dots) {
      context.beginPath();
      context.arc(dot.x, dot.y, radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    }
  }
}
