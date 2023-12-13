import { clamp, random, range } from "lodash";

import { XYCoord } from "../utils/XYCoord";
import { CatSettings } from "./CatSettings";

const startAngles = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];

type Dot = XYCoord & {
  theta: number;
};

export class CatGame {
  private readonly context: CanvasRenderingContext2D;
  private readonly dots: Dot[] = [];

  private interval?: NodeJS.Timeout;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private settings: CatSettings,
  ) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("literally can't render anything. neat");
    }
    this.context = context;
  }

  start() {
    this.dots.push(...range(this.settings.count).map(() => this.randomDot()));
    this.startInterval();
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.update();
      this.render();
    }, 1000 / this.settings.frameRate);
  }

  stop() {
    this.stopInterval();
    this.dots.splice(0, this.dots.length);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  setSettings(value: CatSettings) {
    const old = this.settings;
    this.settings = value;
    if (old.count !== value.count) {
      this.updateDots();
    }
    if (old.frameRate !== value.frameRate) {
      this.stopInterval();
      this.startInterval();
    }
  }

  swapPalette() {
    const newBackground = this.settings.color;
    this.settings.color = this.settings.backgroundColor;
    this.settings.backgroundColor = newBackground;
  }

  randomDot(): Dot {
    return {
      x: random(this.canvas.width),
      y: random(this.canvas.height),
      theta: startAngles[random(startAngles.length)],
    };
  }

  /** runs whenever some settings (e.g. count) are changed, to adjust dots without resetting them all */
  updateDots() {
    const { count } = this.settings;
    const diff = count - this.dots.length;
    if (diff > 0) {
      this.dots.push(...range(diff).map(() => this.randomDot()));
    } else if (diff < 0) {
      this.dots.splice(count, -diff);
    }
  }

  /** runs every frame to change dot positions based on velocity and walls */
  update() {
    const { speed, radius } = this.settings;
    const maxX = this.canvas.width - radius;
    const maxY = this.canvas.height - radius;
    for (const dot of this.dots) {
      dot.x += speed * Math.cos(dot.theta);
      dot.y += speed * Math.sin(dot.theta);
      // the dot has moved to somewhere, now bounce off walls instead of passing through
      const thetaOddQuadrant =
        (dot.theta >= 0 && dot.theta < Math.PI / 2) ||
        (dot.theta >= Math.PI && dot.theta <= (3 / 2) * Math.PI);
      const clamped = {
        x: clamp(dot.x, radius, maxX),
        y: clamp(dot.y, radius, maxY),
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
  render() {
    const { canvas, context } = this;
    const { backgroundColor, color, radius } = this.settings;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
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
