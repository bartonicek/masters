import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import * as dtstr from "../datastructures.js";

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
    this.sizeMultiplier = 1;
    this.alphaMultiplier = 1;
  }

  getMappings = (type?: "selected") => {
    let [x, y, size] = ["x", "y", "size"].map((mapping: dtstr.ValidMappings) =>
      this.getMapping(mapping, type)
    );
    size = size
      ? size.map((e) => e * this.sizeMultiplier)
      : Array.from(Array(x.length), (e) => 5).map(
          (e) => e * this.sizeMultiplier
        );
    return [x, y, size];
  };

  drawBase = (context: any) => {
    const [x, y, size] = this.getMappings();
    context.drawClear();
    context.drawBackground();
    context.drawPoints(x, y, this.col, this.stroke, size, this.alphaMultiplier);
  };

  drawHighlight = (context: any, selected: number[]) => {
    const [x, y, size] = this.getMappings("selected");
    context.drawClear();
    context.drawPoints(
      x,
      y,
      "firebrick",
      this.stroke,
      size,
      this.alphaMultiplier
    );
  };

  get boundingRects() {
    const [x, y, size] = this.getMappings();
    return x.map((e, i) => [
      e - size[i],
      e + size[i],
      y[i] - size[i],
      y[i] + size[i],
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
