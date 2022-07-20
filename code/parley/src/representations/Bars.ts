import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import * as dtstr from "../datastructures.js";
import { globalParameters as gpars } from "../globalparameters.js";

export class Bars extends Representation {
  widthMultiplier: number;

  constructor(wrangler: Wrangler, widthMultiplier: number) {
    super(wrangler);
    this.widthMultiplier = widthMultiplier;
    this.sizeMultiplier = widthMultiplier;
    this.sizeLimits = { min: 0.01, max: 1 };
    this.alphaMultiplier = 1;
  }

  get y0() {
    return this.scales.y.plotMin;
  }

  get width() {
    return (
      this.sizeMultiplier *
      (this.getMapping("x").sort()[1] - this.getMapping("x").sort()[0])
    );
  }

  defaultize = () => {
    this.sizeMultiplier = this.widthMultiplier;
    this.alphaMultiplier = 1;
  };

  getMappings = (membership?: dtstr.ValidMemberships) => {
    return ["x", "y"].map((mapping: dtstr.ValidMappings) =>
      this.getMapping(mapping, membership)
    );
  };

  drawBase = (context: any) => {
    const [x, y] = this.getMappings();
    const { y0, width, alphaMultiplier } = this;
    const { col, strokeCol } = gpars.reps.base;
    context.drawClear();
    context.drawBackground();
    context.drawBarsV(x, y, y0, col, alphaMultiplier, strokeCol, width);
  };

  drawHighlight = (context: any) => {
    const [x, y] = this.getMappings(1);
    const { y0, width, alphaMultiplier } = this;
    const { col, strokeCol } = gpars.reps.highlight;
    context.drawClear();
    x ? context.drawBarsV(x, y, y0, col, 1, strokeCol, width) : null;
  };

  get boundingRects() {
    const [x, y] = this.getMappings();
    const [wh, y0] = [this.width / 2, this.scales.y.plotMin];
    return x.map((xi, i) => [
      [xi - wh, y0],
      [xi + wh, y[i]],
    ]);
  }
}
