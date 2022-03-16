import { Plot } from './plot.js'

const getData = async(path) => {
    const response = await fetch(path)
    return response.json()
}

const data1 = await getData('mtcars.json')
const n = 32

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

const plot1 = new Plot(data1.wt, data1.mpg, marker1)
const plot2 = new Plot(data1.cyl, data1.hp, marker1)
const plots = {plot1, plot2}

