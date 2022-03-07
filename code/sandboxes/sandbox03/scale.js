export class Scale {

    constructor(min, max, length) {
        this.min = min
        this.max = max
        this.length = length
    }

    get range() {
        return this.max - this.min
    }

    dataToPx(x) {
        return x.length > 1 ? 
            x.map(e => this.length * ((e - this.min) / this.range)) : 
            this.length * ((x - this.min) / this.range)
    }

    pxToData(x) {
        return x.length > 1 ?
            x.map(e => this.min + this.range * (e / this.length)) :
            this.min + this.range * (x / this.length)
    }

}