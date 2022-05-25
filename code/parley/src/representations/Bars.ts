import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import * as dtstr from "../datastructures.js";

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
    this.alphaMultiplier = 1;
  }

  getMappings = (type?: "selected") => {
    let [x, y] = ["x", "y"].map((mapping: dtstr.ValidMappings) =>
      this.getMapping(mapping, type)
    );
    return [x, y];
  };

  drawBase = (context: any) => {
    const [x, y] = this.getMappings();
    context.drawClear();
    context.drawBackground();
    context.drawBarsV(
      x,
      y,
      this.scales.y.plotMin,
      this.col,
      this.alphaMultiplier,
      this.stroke,
      this.width
    );
  };

  drawHighlight = (context: any, selected: number[]) => {
    const [x, y] = this.getMappings("selected");
    context.drawClear();
    context.drawBarsV(
      x,
      y,
      this.scales.y.plotMin,
      "firebrick",
      this.alphaMultiplier,
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
    return this.wrangler.indices.map((e) => sel[e]);
  };
}
