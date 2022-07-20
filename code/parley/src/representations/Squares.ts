import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import * as dtstr from "../datastructures.js";
import { globalParameters as gpars } from "../globalparameters.js";

export class Squares extends Representation {
  constructor(wrangler: Wrangler) {
    super(wrangler);
  }

  getMappings = (type?: dtstr.ValidMemberships) => {
    let [x, y, size] = ["x", "y", "size"].map((mapping: dtstr.ValidMappings) =>
      this.getMapping(mapping, type)
    );
    const { radius } = type === 1 ? gpars.reps.highlight : gpars.reps.base;

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
    context.drawRectsHW(x, y, size, size, col, this.alpha);
  };

  drawHighlight = (context: any) => {
    const [x, y, size] = this.getMappings(1);
    const { col, strokeCol, strokeWidth } = gpars.reps.highlight;
    const { alphaMultiplier } = this;
    context.drawClear();
    x ? context.drawRectsHW(x, y, size, size, col, this.alpha) : null;
  };

  get boundingRects() {
    const [x, y, size] = this.getMappings();
    const c = 1 / Math.sqrt(2);
    return x.map((xi, i) => [
      [xi - c * size[i], y[i] - c * size[i]],
      [xi + c * size[i], y[i] + c * size[i]],
    ]);
  }
}
