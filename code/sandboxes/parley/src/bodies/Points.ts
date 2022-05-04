import * as stats from "../statistics.js";

export class Points {
  stat: stats.Stat;
  scales: any;

  constructor(
    data: any,
    mapping: any,
    statistic = "identity",
    functions?: string[]
  ) {
    this.stat = stats[statistic](data, mapping, functions);
  }

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  get x() {
    return this.scales.x.dataToPlot(this.stat.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.stat.y);
  }

  draw = (context) => {
    context.drawPoints(this.x, this.y);
  };

  drawBase = (context) => {
    this.draw(context);
  };
}
