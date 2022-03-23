import { ScaleContinuous } from "./ScaleContinuous.js";

export class XYScaleContinuous extends ScaleContinuous {
  constructor(x, length, direction, margins = { lower: 0.15, upper: 0.15 }) {
    super(x, length, direction);
    this.margins = margins;

    // Shift & shrink the scale by the plot margins
    this.offset =
      this.offset + this.direction * this.length * this.margins.lower;
    this.length = (1 - this.margins.lower - this.margins.upper) * this.length;

    this.plotMin = this.dataToPlot(this.dataMin);
    this.plotMax = this.dataToPlot(this.dataMax);
  }

  dataToPlot(x) {
    return this.dataToUnits(x);
  }

  plotToData(x) {
    return this.unitsToData(x);
  }

  pctToPlot(x) {
    return this.pctToUnits(x);
  }

  plotToPct(x) {
    return this.unitsToPct(x);
  }
}
