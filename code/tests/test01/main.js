import { Plot } from './plot.js'
import { Points } from './points.js'
import { initializeCanvasActivation } from './canvasActivation.js'

const x = Array.from(Array(20)).map(e => Math.random() * 100)
const y = Array.from(Array(20)).map(e => Math.random() * 100)
const z = Array.from(Array(20)).map(e => Math.random() * 100)

const plot1 = new Plot(window.innerHeight * 0.5, 
    window.innerHeight * 0.5, 'antiquewhite')
const plot2 = new Plot(window.innerHeight * 0.5, 
    window.innerHeight * 0.5, 'antiquewhite')
const plot3 = new Plot(window.innerHeight * 0.5, 
    window.innerHeight * 0.5, 'antiquewhite')
        
const points1 = new Points(x, y)
const points2 = new Points(x, z, 'firebrick')

plot1.geoms.push(points1, points2)
plot2.geoms.push(points2)

const plotArray = [plot1, plot2, plot3]
plotArray.forEach(e => {
    e.initialize()
    e.draw()
} )

initializeCanvasActivation()