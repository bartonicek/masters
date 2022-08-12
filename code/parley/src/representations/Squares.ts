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

  getMappings = (membership: dtstr.ValidMemberships = 0) => {
    const mappings: dtstr.ValidMappings[] = ["x", "y", "size"];
    let [x, y, size] = mappings.map((e) => this.getMapping(e, membership));
    const radius = gpars.reps.radius[membership];

    size = size
      ? size.map((e) => radius * e * this.sizeMultiplier)
      : Array.from(Array(x.length), (e) => radius).map(
          (e) => e * this.sizeMultiplier
        );
    return [x, y, size];
  };

  drawBase = (context: any) => {
    const [x, y, size] = this.getMappings();
    const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 0);
    const pars = { col, strokeCol, strokeWidth, alpha: this.alphaMultiplier };

    context.drawClear();
    context.drawBackground();
    context.drawRectsHW(x, y, size, size, pars);
  };

  drawHighlight = (context: any) => {
    const [x, y, size] = this.getMappings(1);
    const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 1);
    const pars = { col, strokeCol, strokeWidth, alpha: 1 };

    context.drawClear();
    x ? context.drawRectsHW(x, y, size, size, pars) : null;
  };

  get boundingRects() {
    const [x, y, size] = this.getMappings();
    return x.map((xi, i) => [
      [xi - size[i] / 2, y[i] - size[i] / 2],
      [xi + size[i] / 2, y[i] + size[i] / 2],
    ]);
  }
}
