import { ClickHandler } from "./clickhandler.js"
import { DragHandler } from "./draghandler.js"
import { PlotContainer } from "./plotcontainer.js"
import { Points } from "./points.js"
import { XYScale } from "./scales.js"

export class Plot extends PlotContainer {

    constructor(x, y, marker) {
        
        super()
        this.x = x
        this.y = y
        this.marker = marker
        
        this.scales = {x : new XYScale(0, 10, this.width, 1, {lower : 0.1, upper : 0.1}),
                       y : new XYScale(0, 10, this.height, -1, {lower : 0.1, upper : 0.1})}
        this.objects = {points1 : new Points(this.x, this.y, this.scales)}
        
        this.dragHandler = new DragHandler(this.plotContainer, 
                                            this.objects.points1.boundingRects, 
                                            this.marker)
        this.clickHandler = new ClickHandler(this.plotContainer, this.marker)
        
        this.initialize()
    }

    drawBase(base) {

        Object.keys(this.objects).forEach(e => {
            this.objects[e].drawBase(base)
        })

    }

    drawHighlight(highlight, selected) {
        Object.keys(this.objects).forEach(e => {
            this.objects[e].drawHighlight(highlight, selected)
        })
    }

    initialize() {
        
        this.drawBase(this.plotBase)
        
    }
}
