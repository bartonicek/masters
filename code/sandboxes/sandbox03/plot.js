import { Scale } from "./scale.js"
import { Points } from "./points.js"

export class Plot {

    constructor(
        data, mapping, 
        dims = {width : 600, height : 600},
        coords = {x : {min : -5, max : 25}, 
                  y : {min : -5, max : 25}}) {

        this.data = data
        this.mapping = mapping
        this.scales = {x : new Scale(coords.x.min, coords.x.max, dims.width), 
                       y : new Scale(coords.y.min, coords.y.max, dims.height)}
        this.graphicObjs = [new Points(data, mapping, this.scales)]
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.initialize()
        this.draw()
    }

    initialize() {

        const {canvas, context} = this
        canvas.width = this.scales.x.length
        canvas.height = this.scales.y.length
        document.body.appendChild(canvas)

        context.translate(0, canvas.height)
        context.scale(1, -1)
        
        context.save()
        context.fillStyle = 'antiquewhite'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()

    }

    draw() {
        this.graphicObjs.forEach(e => e.draw(this.canvas, this.context))
    }
}