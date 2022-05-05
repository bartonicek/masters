import { DataFrame } from "./../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";
import * as reps from "../representations/representations.js";
import * as scales from "../scales/scales.js";
import * as stats from "../statistics/statistics.js";

export class Plot extends GraphicStack {
  scales: any;
  representations: any;
  statistics: any;

  constructor(
    public data: DataFrame,
    public mapping: Map<string, string>,
    public marker: object
  ) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.representations = {
      bars1: new reps.Bars(),
      points1: new reps.Points(),
      axisbox1: new reps.AxisBox(),
    };
    this.scales = {
      x: new scales.XYScaleDiscrete(this.width),
      y: new scales.XYScaleContinuous(this.height, -1),
    };
    this.statistics = {
      identity1: new stats.Identity(this.data, this.mapping),
      summary1: new stats.Summary(this.data, this.mapping, ["mean"]),
    };

    this.initialize();
  }

  extractChildren = (object: object, what: string) => {
    return Object.keys(object).map((e) => object?.[e]?.[what]);
  };

  callChildren = (object: object, fun: string, ...args: any) => {
    Object.keys(object).forEach((e) => object?.[e]?.[fun](...args));
  };

  get xVals() {
    const values = [].concat(...this.extractChildren(this.statistics, "x"));
    return Array.from(new Set(values));
  }

  get yVals() {
    const values = [].concat(...this.extractChildren(this.statistics, "y"));
    return Array.from(new Set(values));
  }

  drawBase = () => {
    this.callChildren(this.representations, "drawBase", this.graphicBase);
  };

  initialize = () => {
    this.representations.points1.registerStat(this.statistics.identity1);
    this.representations.bars1.registerStat(this.statistics.summary1);
    this.scales.x.registerData(this.xVals);
    this.scales.y.registerData(this.yVals);
    this.callChildren(this.representations, "registerScales", this.scales);
    this.drawBase();
  };
}
