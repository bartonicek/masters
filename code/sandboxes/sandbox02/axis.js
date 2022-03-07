import { graphicPars } from "./graphicPars.js"

export class Axis {
    constructor(length, coords, flip = false) {
        this.flip = flip
        this.length = length
        this.coords = coords
    }

    get range() {
        return this.coords.max - this.coords.min
    }

    dataToPx = (x) => {
        
        const sign = this.flip ? -1 : 1
        const offset = this.flip ? this.length : 0
        
        return x.map(e => {
            return offset + sign * this.length * (e / this.range)
        })
    }
}