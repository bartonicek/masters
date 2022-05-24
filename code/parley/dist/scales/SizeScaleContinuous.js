import { ScaleContinuous } from "./ScaleContinuous.js";
export class AreaScaleContinuous extends ScaleContinuous {
    constructor(length, direction = 1, zero = false) {
        super(length, direction, zero);
    }
    dataToPlot = (data) => {
        return this.dataToUnits(data);
    };
}
