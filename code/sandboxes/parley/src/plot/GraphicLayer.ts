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

  drawBackground() {
    this.context.save();
    this.context.fillStyle = "antiquewhite";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  drawBarsV(
    x: number[],
    y: number[],
    y0: number,
    col = "steelblue",
    width = this.width / (2 * x.length)
  ) {
    const context = this.context;
    context.save();
    context.fillStyle = col;
    x.forEach((e, i) => {
      context.fillRect(e - width / 2, y0, width, y[i] - y0);
    });
    context.restore();
  }

  drawClear() {
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  drawLine(x: number[], y: number[], col = "black", stroke = 1) {
    const context = this.context;
    context.save();
    context.strokeStyle = col;
    context.lineWidth = stroke;
    context.beginPath();
    context.moveTo(x[0], y[0]);
    x.shift();
    y.shift();
    x.forEach((e, i) => {
      context.lineTo(e, y[i]);
    });
    context.stroke();
    context.restore();
  }

  drawPoints(x: number[], y: number[], col = "steelblue", radius = 5) {
    const context = this.context;
    context.save();
    context.fillStyle = col;
    x.forEach((e, i) => {
      context.beginPath();
      context.arc(e, y[i], radius, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  }
}
