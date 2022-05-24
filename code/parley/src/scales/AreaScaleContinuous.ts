import { ScaleContinuous } from "./ScaleContinuous.js";

export class AreaScaleContinuous extends ScaleContinuous {
  constructor(length: number, direction = 1, zero = false) {
    super(length, direction, zero);
  }

  get dataMin() {
    return 0;
  }

  dataToPlot = (data: number | number[]) => {
    return this.dataToUnits(data);
  };
}
