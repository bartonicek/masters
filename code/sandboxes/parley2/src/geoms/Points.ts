import * as stats from "../statistics.js";

export class Points {
  stat: { x: any; y: any };
  scales: { x: { dataToPlot: Function }; y: { dataToPlot: Function } };
  dataX: (number | string | boolean)[];
  dataY: (number | string | boolean)[];
  statX: (number | string | boolean)[];
  statY: (number | string | boolean)[];

  constructor(
    data: any,
    mapping: any,
    stat = {
      x: { name: "identity", args: ["identity"] },
      y: { name: "identity", args: ["identity"] },
    }
  ) {
    this.dataX = data[mapping.get("x")];
    this.dataY = data[mapping.get("y")];
    this.statX = stats[stat.x.name](this.dataX, ...stat.x.args);
    this.statY = stats[stat.y.name](this.dataY, ...stat.y.args);
  }

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  get plotX() {
    return this.scales.x.dataToPlot(this.statX);
  }

  get plotY() {
    return this.scales.y.dataToPlot(this.statY);
  }

  draw = (context) => {
    context.drawPoints(this.plotX, this.plotY);
  };
}
