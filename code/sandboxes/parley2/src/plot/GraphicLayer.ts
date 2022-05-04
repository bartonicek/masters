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
    x: Array<number>,
    y: Array<number>,
    y0: number,
    redraw = false,
    col = "steelblue",
    width = this.width / (2 * x.length)
  ) {
    const context = this.context;
    context.save();
    context.fillStyle = col;
    if (redraw) context.clearRect(0, 0, this.width, this.height);
    x.forEach((e, i) => {
      context.fillRect(e, y0 - y[i], width, y[i]);
    });
    context.restore();
  }

  drawPoints(
    x: Array<number>,
    y: Array<number>,
    redraw = false,
    col = "steelblue",
    radius = 5
  ) {
    const context = this.context;
    context.save();
    context.fillStyle = col;
    if (redraw) context.clearRect(0, 0, this.width, this.height);
    x.forEach((e, i) => {
      context.beginPath();
      context.arc(e, y[i], radius, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  }
}
