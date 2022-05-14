import { Handler } from "../handlers/Handler.js";
import { Scale } from "../scales/Scale.js";
import { Wrangler } from "../wrangler/Wrangler.js";

export class Representation {
  wrangler: Wrangler;
  handler: Handler;
  scales: { [key: string]: any };
  alpha: number;
  col: string;
  stroke: string;
  radius: number;

  constructor(wrangler: Wrangler, handler: Handler) {
    this.wrangler = wrangler;
    this.handler = handler;
  }

  get x() {
    return this.scales.x.dataToPlot(this.wrangler.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.wrangler.y);
  }

  get boundingRects() {
    return [];
  }

  drawBase = (context: any) => {};
  drawHighlight = (context: any, selectedPoints: number[]) => {};

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  inSelection = (selectionPoints) => {};
}
