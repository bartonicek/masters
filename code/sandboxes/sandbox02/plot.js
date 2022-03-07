import { graphicPars } from "./graphicPars.js"
import { Axis } from "./axis.js"

export class Plot {

    constructor(
        data,
        mapping,
        dims = {height : graphicPars.panel.height, 
                width : graphicPars.panel.width},
        coords = {x : {min : 0, max : 20}, y : {min : 0, max : 20}},
        col = 'antiquewhite') {
            
        this.data = data
        this.mapping = mapping
        this.dims = dims
        this.xAxis = new Axis(dims.width, coords.x, false)
        this.yAxis = new Axis(dims.height, coords.y, true)
        this.axes = {x : this.xAxis, y : this.yAxis}
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.graphicObjs = []
        this.initialize()
    }

    initialize() {

        const {canvas, context, dims} = this
        const panel = graphicPars.panel
        
        canvas.width = dims.width
        canvas.height = dims.height
        document.body.appendChild(canvas)

        context.save()
        context.fillStyle = panel.bg
        context.fillRect(0, 0, canvas.width, canvas.height)
        
        if (graphicPars.panel.outline) {
            context.strokeStyle = panel.outline
            context.lineWidth = panel.outlineStroke
            context.strokeRect(0, 0, canvas.width, canvas.height)
        }

        context.restore()

    }

    draw() {

        this.graphicObjs
        .forEach(e => e.draw(this.data, this.mapping, 
                             this.axes, this.context))
    }
}