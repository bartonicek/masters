import * as funs from "../functions.js";
import { globalParameters as gpars } from "../globalparameters.js";

export class GraphicLayer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  backgroundColour: string;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.backgroundColour = "antiquewhite";

    this.canvas.width = width;
    this.canvas.height = height;
  }

  dropMissing = (...vectors: any[]) => {
    let missingIndices = [...vectors].flatMap((vector) =>
      vector
        .flatMap((value, index) => (value === null ? index : []))
        .sort((a, b) => a - b)
    );
    missingIndices = Array.from(new Set(missingIndices));
    return [...vectors].map((vector) =>
      vector.flatMap((value, index) =>
        missingIndices.indexOf(index) === -1 ? value : []
      )
    );
  };

  drawClear = () => {
    const context = this.context;
    context.save();
    context.clearRect(0, 0, this.width, this.height);
    context.restore();
  };

  drawBackground = () => {
    const context = this.context;
    context.save();
    context.fillStyle = gpars.bgCol;
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
  };

  drawBarsV = (
    x: number[],
    y: number[],
    y0: number,
    col = gpars.reps.base.col,
    alpha = 1,
    stroke = null,
    width = 50
  ) => {
    const [xs, ys] = this.dropMissing(x, y);
    const context = this.context;
    context.save();
    context.fillStyle =
      alpha < 1 ? col + Math.round(alpha * 255).toString(16) : col;
    xs.forEach((e, i) => {
      col ? context.fillRect(e - width / 2, ys[i], width, y0 - ys[i]) : null;
      stroke
        ? context.strokeRect(e - width / 2, ys[i], width, y0 - ys[i])
        : null;
    });
    context.restore();
  };

  drawPoints = (
    x: number[],
    y: number[],
    col = gpars.reps.base.col,
    stroke = null,
    radius = 5,
    alpha = 1
  ) => {
    const context = this.context;
    const rs =
      typeof radius === "number"
        ? Array.from(Array(x.length), (e) => radius)
        : radius;
    context.save();
    context.fillStyle =
      alpha < 1 ? col + Math.round(alpha * 255).toString(16) : col;
    context.strokeStyle = stroke;
    x.forEach((e, i) => {
      context.beginPath();
      context.arc(e, y[i], rs[i], 0, Math.PI * 2);
      stroke ? context.stroke() : null;
      col ? context.fill() : null;
    });
    context.restore();
  };

  drawLine = (x: number[], y: number[], col = "black") => {
    const context = this.context;
    context.save();
    context.beginPath();
    context.strokeStyle = col;
    context.moveTo(x[0], y[0]);
    x.shift();
    y.shift();
    x.forEach((e, i) => {
      context.lineTo(e, y[i]);
    });
    context.stroke();
    context.restore();
  };

  drawText = (
    x: number[],
    y: number[],
    labels: string[],
    size = 20,
    rotate?: number
  ) => {
    const context = this.context;
    context.save();
    context.textAlign = "center";
    context.font = `${size}px Times New Roman`;
    x.forEach((e, i) => {
      context.translate(e, y[i]);
      if (rotate) context.rotate((rotate / 360) * Math.PI * 2);
      context.fillText(labels[i], 0, 0);
      context.translate(-e, -y[i]);
    });
    context.restore();
  };

  drawWindow = (
    start: [number, number],
    end: [number, number],
    col = "rgba(0, 0, 0, 0.1)",
    stroke = "rgba(0, 0, 0, 0.25)"
  ) => {
    const context = this.context;
    context.save();
    context.fillStyle = col;
    context.strokeStyle = stroke;
    context.setLineDash([5, 5]);
    context.fillRect(0, 0, this.width, this.height);
    context.clearRect(start[0], start[1], end[0] - start[0], end[1] - start[1]);
    context.strokeRect(
      start[0],
      start[1],
      end[0] - start[0],
      end[1] - start[1]
    );
    context.restore();
  };
}
