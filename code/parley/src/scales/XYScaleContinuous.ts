import { ScaleContinuous } from "./ScaleContinuous.js";

export class XYScaleContinuous extends ScaleContinuous {
  margins: { lower: number; upper: number };

  constructor(
    length: number,
    direction = 1,
    expand = 0.1,
    margins = { lower: 0.15, upper: 0.15 }
  ) {
    super(length, direction, expand);
    this.margins = margins;

    // Shift & shrink the scale by the plot margins
    this.offset =
      this.offset + this.direction * this.length * this.margins.lower;
    this.length = (1 - this.margins.lower - this.margins.upper) * this.length;
  }

  get plotMin() {
    return this.dataToPlot(this.dataMin);
  }

  get plotMax() {
    return this.dataToPlot(this.dataMax);
  }

  dataToPlot = (data: number | number[]) => {
    return this.dataToUnits(data);
  };

  plotToData = (units: number | number[]) => {
    return this.unitsToData(units);
  };

  pctToPlot = (pct: number | number[]) => {
    return this.pctToUnits(pct);
  };

  plotToPct = (units: number | number[]) => {
    return this.unitsToPct(units);
  };
}
