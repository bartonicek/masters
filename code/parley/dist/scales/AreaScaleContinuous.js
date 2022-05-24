import { ScaleContinuous } from "./ScaleContinuous.js";
export class AreaScaleContinuous extends ScaleContinuous {
    constructor(length, direction = 1, zero = false) {
        super(length, direction, zero);
    }
    get dataMin() {
        return 0;
    }
    dataToPlot = (data) => {
        return this.dataToUnits(data);
    };
}
