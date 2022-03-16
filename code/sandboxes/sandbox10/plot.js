import { Axis } from "./axis.js"
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
        
        this.scales = {x : new XYScale(Math.min(...this.x), Math.max(...this.x),
                                        this.width, 1, {lower : 0.1, upper : 0.1}),
                       y : new XYScale(Math.min(...this.y), Math.max(...this.y), 
                                        this.height, -1, {lower : 0.1, upper : 0.1})}
        this.objects = {
                        points1 : new Points(this.x, this.y, this.scales),
                        axis1 : new Axis(this.scales),
                        }
        
        this.dragHandler = new DragHandler(this.plotContainer, 
                                            this.objects.points1.boundingRects, 
                                            this.marker)
        this.clickHandler = new ClickHandler(this.plotContainer, this.marker)
        
        this.initialize()
    }

    drawBase(base) {

        Object.keys(this.objects).forEach(e => {
            this.objects[e]
                ?.drawBase
                ?.call(this.objects[e], base)
        })

    }

    drawHighlight(highlight, selected) {
        
        Object.keys(this.objects).forEach(e => {
            this.objects[e]
                ?.drawHighlight
                ?.call(this.objects[e], highlight, selected)
        })
        
    }

    initialize() {
        
        this.drawBase(this.plotBase)
        
    }
}
