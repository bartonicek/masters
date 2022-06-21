import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import * as dtstr from "../datastructures.js";
import { globalParameters as gpars } from "../globalparameters.js";

export class Points extends Representation {
  constructor(
    wrangler: Wrangler,
    handler: Handler,
    plotDims: { width: number; height: number }
  ) {
    super(wrangler, handler, plotDims);
    this.radius = 5;
    this.sizeMultiplier = 1;
    this.alphaMultiplier = 1;
  }

  getMappings = (type?: "selected") => {
    let [x, y, size] = ["x", "y", "size"].map((mapping: dtstr.ValidMappings) =>
      this.getMapping(mapping, type)
    );
    const { radius } =
      type === "selected" ? gpars.reps.highlight : gpars.reps.base;

    size = size
      ? size.map((e) => radius * e * this.sizeMultiplier)
      : Array.from(Array(x.length), (e) => radius).map(
          (e) => e * this.sizeMultiplier
        );
    return [x, y, size];
  };

  drawBase = (context: any) => {
    const [x, y, size] = this.getMappings();
    const { col, strokeCol, strokeWidth } = gpars.reps.base;
    context.drawClear();
    context.drawBackground();
    context.drawPoints(x, y, col, strokeCol, size, this.alphaMultiplier);
  };

  drawHighlight = (context: any) => {
    const [x, y, size] = this.getMappings("selected");
    const { col, strokeCol, strokeWidth } = gpars.reps.highlight;
    const { alphaMultiplier } = this;
    context.drawClear();
    x ? context.drawPoints(x, y, col, strokeCol, size, alphaMultiplier) : null;
  };

  get boundingRects() {
    const [x, y, size] = this.getMappings();
    const c = 1 / Math.sqrt(2);
    return x.map((xi, i) => [
      [xi - c * size[i], y[i] - c * size[i]],
      [xi + c * size[i], y[i] - c * size[i]],
      [xi - c * size[i], y[i] + c * size[i]],
      [xi + c * size[i], y[i] + c * size[i]],
    ]);
  }

  inSelection = (selectionPoints: [[number, number], [number, number]]) => {
    const selected = this.boundingRects.map((rect) =>
      funs.polyOverlap(rect, selectionPoints)
    );
    return this.wrangler.indices.map((index) => selected[index]);
  };
}
