import * as dtstr from "../datastructures.js";
import * as funs from "../functions.js";
import { Scale } from "../scales/Scale.js";
import { Wrangler } from "../wrangler/Wrangler.js";

export class Representation {
  wrangler: Wrangler;
  plotDims: { width: number; height: number };
  scales: { [key: string]: any };
  alpha: number;
  col: string;
  stroke: string;
  radius: number;
  sizeMultiplier: number;
  sizeLimits: { min: number; max: number };
  alphaMultiplier: number;
  alphaLimits: { min: number; max: number };

  constructor(wrangler: Wrangler) {
    this.wrangler = wrangler;
    this.sizeMultiplier = 1;
    this.alphaMultiplier = 1;
    this.sizeLimits = {
      min: 0.001,
      max: 10,
    };
    this.alphaLimits = {
      min: 0.01,
      max: 1,
    };
  }

  getMapping = (mapping: dtstr.ValidMappings, type?: 1 | 2 | 3) => {
    let res = this.wrangler[mapping]?.extract2(type);
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

  // Checks which bounding rects overlap with a rectangular selection region
  //E.g. [[0, 0], [Width, Height]] should include all bound. rects
  inSelection = (selectionRect: dtstr.Rect2Points) => {
    const selectedReps = this.boundingRects.map((rect: dtstr.Rect2Points) =>
      funs.rectOverlap(rect, selectionRect)
    );
    const selectedDatapoints = this.wrangler.indices.flatMap((e, i) =>
      selectedReps[e] ? i : []
    );
    return selectedDatapoints;
  };

  // Handle generic keypress actions
  onKeypress = (key: string) => {
    const { sizeMultiplier, sizeLimits, alphaMultiplier, alphaLimits } = this;

    if (key === "KeyR") this.defaultize();

    if (key === "Minus" && sizeMultiplier) {
      this.sizeMultiplier = funs.gatedMultiply(sizeMultiplier, 0.8, sizeLimits);
    }

    if (key === "Equal" && sizeMultiplier && sizeMultiplier < sizeLimits.max) {
      this.sizeMultiplier = funs.gatedMultiply(sizeMultiplier, 1.2, sizeLimits);
    }

    if (key === "BracketLeft" && alphaMultiplier) {
      this.alphaMultiplier = funs.gatedMultiply(
        alphaMultiplier,
        0.8,
        alphaLimits
      );
    }
    if (key === "BracketRight" && alphaMultiplier)
      this.alphaMultiplier = funs.gatedMultiply(
        alphaMultiplier,
        1.2,
        alphaLimits
      );
  };
}
