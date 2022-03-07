import { PlotStack } from "./plotstack.js";
import { XYScale } from "./xyscale.js";
import { Points } from "./points.js";
import { Axis } from "./axis.js";
import { DragHandler } from "./draghandler.js";

export class Plot extends PlotStack {

    constructor(data, mapping) {
        super()
        this.data = data
        this.mapping = mapping
        this.scales = {x : new XYScale(0, 20, this.width, 1, 
                        {lower : 0.1, upper : 0.1}),
                       y : new XYScale(0, 20, this.height, -1, 
                        {lower : 0.1, upper : 0.1})}
        this.objects = {points1 : new Points(this.data, this.mapping, this.scales),
                        axis1 : new Axis(this.scales)}
        this.dragHandler = new DragHandler(this.plotBox, this.user.context)
        this.initialize()
        this.drawBase(this.base)

    }

    initialize() {

        this.dragHandler.plotX = this.objects.points1.plotX
        this.dragHandler.plotY = this.objects.points1.plotY

        this.plotBox.addEventListener('mousemove', event => {
            this.drawHighlight()
        })

        this.plotBox.addEventListener('dblclick', event => {

            this.dragHandler.selected = this.dragHandler.selected.map(e => false)
            this.highlight.context.clearRect(0, 0, this.width, this.height)

        })
    }

    drawBase() {
        Object.keys(this.objects).forEach(e => {
            this.objects[e].drawBase(this.base)
        })
    }

    drawHighlight() {
        Object.keys(this.objects).forEach(e => {
            this.objects[e].drawHighlight(this.highlight, this.dragHandler.selected)
        })
    }

}