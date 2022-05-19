import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";

export class Bars extends Representation {
  width: number;
  constructor(
    wrangler: Wrangler,
    handler: Handler,
    plotDims: { width: number; height: number }
  ) {
    super(wrangler, handler, plotDims);
    this.width =
      plotDims.width / (3 * funs.unique(wrangler.x.extract()).length);
  }

  drawBase = (context: any) => {
    const x = this.getMapping("x");
    const y = this.getMapping("y");

    context.drawBarsV(
      x,
      y,
      this.scales.y.plotMin,
      this.col,
      this.stroke,
      this.width
    );
  };

  drawHighlight = (context: any, selected: number[]) => {
    const x = this.getMapping("x", "selected");
    const y = this.getMapping("y", "selected");

    console.log(y);
    context.drawClear();
    context.drawBarsV(
      x,
      y,
      this.scales.y.plotMin,
      "firebrick",
      this.stroke,
      this.width
    );
  };

  get boundingRects() {
    const x = this.getMapping("x");
    const y = this.getMapping("y");

    return x.map((e, i) => [
      e - this.width / 2,
      e + this.width / 2,
      this.scales.y.plotMin,
      y[i],
    ]);
  }

  inSelection = (selectionPoints) => {
    const combns = [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ];

    const sel = this.boundingRects.map((points) => {
      return combns
        .map((indices) => indices.map((index) => points[index]))
        .some((point: [number, number]) =>
          funs.pointInRect(point, selectionPoints)
        );
    });
    //console.log(this.wrangler.indices.map((e) => sel[e]));
    return this.wrangler.indices.map((e) => sel[e]);
  };
}
