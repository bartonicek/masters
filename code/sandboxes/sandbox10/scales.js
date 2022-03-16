export class Scale {

    constructor(min, max, length, direction = 1) {
        this.min = min
        this.max = max
        this.length = length
        this.direction = direction
        this.offset = this.direction === -1 ? this.length : 0
    }

    get range() {
        return this.max - this.min
    }

    dataToUnits(x) {
        const {min, length, offset, direction, range} = this
        return x.length > 1 ? 
            x.map(e => offset + direction * length * ((e - min) / range)) : 
            offset + direction * length * ((x - min) / range)
    }

    unitsToData(x) {
        const {min, length, offset, direction, range} = this
        return x.length > 1 ?
            x.map(e => min + direction * range * ((e - offset) / length)) :
            min + direction * range * ((x - offset) / length)
    }

}

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

