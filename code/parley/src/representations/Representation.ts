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

  constructor(
    wrangler: Wrangler,
    handler: Handler,
    plotDims: { width: number; height: number }
  ) {
    this.wrangler = wrangler;
    this.handler = handler;
    this.plotDims = plotDims;
  }

  getMapping = (mapping: dtstr.ValidMappings, type?: "selected") => {
    return this.scales[mapping].dataToPlot(
      this.wrangler[mapping].extract(type)
    );
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

  inSelection = (selectionPoints) => {};
}
