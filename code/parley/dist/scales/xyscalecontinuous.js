import { ScaleContinuous } from "./scalecontinuous.js";
export class XYScaleContinuous extends ScaleContinuous {
    margins;
    plotMin;
    plotMax;
    constructor(x, length, direction = 1, expand = 0.1, margins = { lower: 0.15, upper: 0.15 }) {
        super(x, length, direction, expand);
        this.margins = margins;
        // Shift & shrink the scale by the plot margins
        this.offset =
            this.offset + this.direction * this.length * this.margins.lower;
        this.length = (1 - this.margins.lower - this.margins.upper) * this.length;
        this.plotMin = this.dataToPlot(this.dataMin);
        this.plotMax = this.dataToPlot(this.dataMax);
    }
    dataToPlot = (x) => {
        return this.dataToUnits(x);
    };
    plotToData = (x) => {
        return this.unitsToData(x);
    };
    pctToPlot = (x) => {
        return this.pctToUnits(x);
    };
    plotToPct = (x) => {
        return this.unitsToPct(x);
    };
}
