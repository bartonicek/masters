import { ScaleContinuous } from "./ScaleContinuous.js";
export class XYScaleContinuous extends ScaleContinuous {
    margins;
    constructor(length, direction = 1, zero = false, expand = 0.1, margins = { lower: 0.15, upper: 0.15 }) {
        super(length, direction, zero, expand);
        this.margins = margins;
        // Shift & shrink the scale by the plot margins
        this.offset =
            this.offset + this.direction * this.length * this.margins.lower;
        this.length = (1 - this.margins.lower - this.margins.upper) * this.length;
    }
    get plotMin() {
        return this.pctToUnits(0);
    }
    get plotMax() {
        return this.pctToUnits(1);
    }
    dataToPlot = (data) => {
        return this.dataToUnits(data);
    };
    plotToData = (units) => {
        return this.unitsToData(units);
    };
    pctToPlot = (pct) => {
        return this.pctToUnits(pct);
    };
    plotToPct = (units) => {
        return this.unitsToPct(units);
    };
}
