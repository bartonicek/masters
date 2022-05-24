import { ScaleContinuous } from "./ScaleContinuous.js";
export class SizeScaleContinuous extends ScaleContinuous {
    constructor(length, direction = 1, zero = false) {
        super(length, direction, zero);
        this.expand = 0;
    }
    dataToPlot = (data) => {
        return this.dataToUnits(data);
    };
}
