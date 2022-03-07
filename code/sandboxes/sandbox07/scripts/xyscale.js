import { Scale } from "./scale.js";

export class XYScale extends Scale {

    constructor(min, max, length, direction, margins) {
        super(min, max, length, direction)
        this.margins = margins
        
        // Shift & shrink the scale by the plot margins
        this.offset = this.offset + this.direction * this.length * this.margins.lower
        this.length = (1 - this.margins.lower - this.margins.upper) * this.length  
    } 
    
    dataToPlot(x) {
        return this.dataToUnits(x)
    }

    plotToData(x) {
        return this.unitsToData(x)
    }

}

