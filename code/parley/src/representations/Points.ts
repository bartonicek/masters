import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";

export class Points extends Representation {
  constructor(
    wrangler: Wrangler,
    handler: Handler,
    plotDims: { width: number; height: number }
  ) {
    super(wrangler, handler, plotDims);
    this.col = "steelblue";
    this.stroke = null;
    this.radius = 5;
  }

  drawBase = (context: any) => {
    const x = this.getMapping("x");
    const y = this.getMapping("y");
    context.drawPoints(x, y, this.col, this.stroke, this.radius);
  };

  drawHighlight = (context: any, selected: number[]) => {
    const x = this.getMapping("x", "selected");
    const y = this.getMapping("y", "selected");
    context.drawClear();
    context.drawPoints(x, y, "firebrick", this.stroke, this.radius);
  };

  get boundingRects() {
    const x = this.getMapping("x");
    const y = this.getMapping("y");

    return x.map((e, i) => [
      e - this.radius,
      e + this.radius,
      y[i] - this.radius,
      y[i] + this.radius,
    ]);
  }

  inSelection = (selectionPoints) => {
    const combns = [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ];

    return this.boundingRects.map((points) => {
      return combns
        .map((indices) => indices.map((index) => points[index]))
        .some((point: [number, number]) =>
          funs.pointInRect(point, selectionPoints)
        );
    });
  };
}
