import { BarsPrimitive } from "./primitives/barsprim.js";

export class CountBars {
  constructor(data, mapping, scales) {
    this.dataX = data[mapping.get("x")];

    this.map = this.dataX.reduce(
      (a, b) => a.set(b, (a.get(b) || 0) + 1),
      new Map()
    );
    this.values = [...this.map.keys()];
    this.counts = [...this.map.values()];

    this.n = this.dataX.length;
    this.scales = scales;
    this.width = this.scales.x.length / (2 * this.n);

    this.y0 = this.scales.y.plotMin;
  }

  get plotX() {
    return this.scales.x.dataToPlot(this.values);
  }

  get plotY() {
    return this.scales.y.dataToPlot(this.counts);
  }

  drawBase(context) {
    const x = this.plotX;
    const y = this.plotY;

    BarsPrimitive.draw(context, x, y, this.y0);
  }
}
