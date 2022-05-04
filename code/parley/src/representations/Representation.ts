export class Representation {
  stat: any;
  scales: any;

  get x() {
    return this.scales.x.dataToPlot(this.stat.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.stat.y);
  }

  registerStat = (stat: any) => {
    this.stat = stat;
  };

  registerScales = (scales: any) => {
    this.scales = scales;
  };
}
