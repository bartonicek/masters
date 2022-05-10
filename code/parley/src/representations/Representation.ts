export class Representation {
  wrangler: any;
  scales: any;

  get x() {
    return this.scales.x.dataToPlot(this.wrangler.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.wrangler.y);
  }

  registerWrangler = (stat: any) => {
    this.wrangler = stat;
  };

  registerScales = (scales: any) => {
    this.scales = scales;
  };
}
