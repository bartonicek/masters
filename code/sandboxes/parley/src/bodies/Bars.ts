import * as datastr from "../datastructures.js";
import * as stats from "../statistics.js";

export class Bars {
  data: datastr.DataFrame;
  mapping: any;
  stat: stats.Stat;
  scales: any;

  constructor(data: datastr.DataFrame, mapping: any) {
    this.data = data;
    this.mapping = mapping;
  }

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  registerStat = (statistic = "count", ...args) => {
    this.stat = stats[statistic](this.data, this.mapping, ...args);
  };

  get x() {
    return this.scales.x.dataToPlot(this.stat.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.stat.y);
  }

  draw = (layer) => {
    layer.drawBarsV(
      this.x,
      this.y,
      this.scales.y.dataToPlot(this.scales.y.dataMin),
      "silver"
    );
  };

  drawBase = (layer) => {
    this.draw(layer);
  };
}
