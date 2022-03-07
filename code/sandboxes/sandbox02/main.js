import { Plot } from './plot.js'
import { Points } from './points.js'
import { Bars } from './bars.js'

// const nPlots = 8
// const plotKeys = Array(nPlots).fill().map((e, i) => i)

// let height, weight, data1
// const plotArray = []

// plotKeys.forEach(e => {
//     height = Array.from(Array(100)).map(e => Math.random() * 100)
//     weight = Array.from(Array(100)).map(e => Math.random() * 100)
//     data1 = {height, weight}

//     const points1 = new Points(cols, weight.map(e => e / 4))
//     plotArray[e] = new Plot(data1, mapping1, {height : 400, width : 400})
//     plotArray[e].graphicObjs.push(points1)
//     plotArray[e].draw(height, weight)
// })

const mapping1 = new Map([
    ["x", "height"],
    ["y", "weight"]
])

const height = Array.from(Array(20))
               .map(e => Math.round(Math.random() * 20))
const weight = Array.from(Array(20)).map(e => Math.random() * 20)
const data1 = {height, weight}
const cols = ['seagreen', 'skyblue', 'firebrick']

const plot1 = new Plot(data1, mapping1)
const plot2 = new Plot(data1, mapping1)
const points1 = new Points(cols, weight.map(e => e / 2))
const bars1 = new Bars()

plot1.graphicObjs.push(points1)
plot2.graphicObjs.push(bars1)
plot1.draw()
plot2.draw()
