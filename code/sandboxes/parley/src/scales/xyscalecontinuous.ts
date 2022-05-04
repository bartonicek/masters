import { ScaleContinuous } from "./scalecontinuous.js";

export class XYScaleContinuous extends ScaleContinuous {
  margins: { lower: number; upper: number };
  plotMin: number | number[];
  plotMax: number | number[];

  constructor(
    x: number[],
    length: number,
    direction = 1,
    expand = 0.2,
    margins = { lower: 0.1, upper: 0.1 }
  ) {
    super(x, length, direction, expand);
    this.margins = margins;

    // Shift & shrink the scale by the plot margins
    this.offset =
      this.offset + this.direction * this.length * this.margins.lower;
    this.length = (1 - this.margins.lower - this.margins.upper) * this.length;

    this.plotMin = this.dataToPlot(this.dataMin);
    this.plotMax = this.dataToPlot(this.dataMax);
  }

  dataToPlot = (x: number | number[]) => {
    return this.dataToUnits(x);
  };

  plotToData = (x: number | number[]) => {
    return this.unitsToData(x);
  };

  pctToPlot = (x: number | number[]) => {
    return this.pctToUnits(x);
  };

  plotToPct = (x: number | number[]) => {
    return this.unitsToPct(x);
  };
}