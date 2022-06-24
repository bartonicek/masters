import * as dtstr from "../datastructures.js";
import { Handler } from "../handlers/Handler.js";
import { Scale } from "../scales/Scale.js";
import { Wrangler } from "../wrangler/Wrangler.js";

export class Representation {
  wrangler: Wrangler;
  handler: Handler;
  plotDims: { width: number; height: number };
  scales: { [key: string]: any };
  alpha: number;
  col: string;
  stroke: string;
  radius: number;
  sizeMultiplier: number;
  alphaMultiplier: number;

  constructor(wrangler: Wrangler, handler: Handler) {
    this.wrangler = wrangler;
    this.handler = handler;
  }

  getMapping = (mapping: dtstr.ValidMappings, type?: "selected") => {
    let res = this.wrangler[mapping]?.extract(type);
    res = this.scales[mapping]?.dataToPlot(res);
    return res;
  };

  get boundingRects() {
    return [];
  }

  drawBase = (context: any) => {};
  drawHighlight = (context: any, selectedPoints: number[]) => {};

  registerScales = (scales: any) => {
    this.scales = scales;
    return this;
  };

  defaultize = () => {
    this.alphaMultiplier = 1;
    this.sizeMultiplier = 1;
  };

  incrementSizeMultiplier = () => {};
  inSelection = (selectionPoints) => {};

  onKeypress = (key: string) => {
    if (key === "KeyR") this.defaultize();
    if (key === "Minus" && this.sizeMultiplier) this.sizeMultiplier *= 0.8;
    if (key === "Equal" && this.sizeMultiplier) this.sizeMultiplier *= 1.2;
    if (key === "BracketLeft" && this.alphaMultiplier) {
      this.alphaMultiplier =
        0.8 * this.alphaMultiplier < 0.01
          ? 0.01
          : (this.alphaMultiplier *= 0.8);
    }
    if (key === "BracketRight" && this.alphaMultiplier)
      this.alphaMultiplier =
        1.2 * this.alphaMultiplier > 1 ? 1 : (this.alphaMultiplier *= 1.2);
  };
}
