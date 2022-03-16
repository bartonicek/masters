import { Plot } from './plot.js'

const n = 20
const x = Array.from(Array(n)).map(e => Math.random() * 10)
const y = Array.from(Array(n)).map(e => Math.random() * 10)
const z = Array.from(Array(n)).map(e => Math.random() * 10)
const w = Array.from(Array(n)).map(e => Math.random() * 10)

class Marker {

    constructor(n) {
        this.selected = Array.from(Array(n)).map(e => false)
    }

    receive(selectedPoints) {

        this.selected = this.selected.map((e, i) => {
            return selectedPoints.includes(i)
        })

        const selected = this.selected

        Object.keys(plots).forEach(e => {
            plots[e].drawHighlight(plots[e].plotHighlight, selected)
        })
    
    }

}

const marker1 = new Marker(n)
const plot1 = new Plot(x, y, marker1)
const plot2 = new Plot(z, w, marker1)

const plots = {plot1, plot2}

const pointIn = (x, y, a0, a1, b0, b1) => {
    return ((x - a0) * (x - a1)) < 0 && ((y - b0) * (y - b1)) < 0
}
