import { PlotStack } from "./plotstack.js";
import { Scale } from "./scale.js";
import { DragHandler } from "./draghandler.js";

export class Plot extends PlotStack {

    constructor(coords) {
        super()
        this.scales = {x : new Scale(coords.xmin, coords.xmax, this.width), 
                       y : new Scale(coords.ymin, coords.ymax, this.height)}
        this.graphicObjs = {}
        this.initialize()
   }

   initialize() {
        this.dragHandler = new DragHandler(this.container)

        this.container.addEventListener('mousemove', () => {
            
                const {x0, y0, x1, y1} = this.dragHandler.container
    
                this.select.context.clearRect(0, 0, this.width, this.height)
                this.select.context.fillStyle = 'rgba(100, 100, 100, 0.1)'
                this.select.context.fillRect(x0, y0, x1 - x0, y1 - y0)
                this.select.context.strokeRect(x0, y0, x1 - x0, y1 - y0)
        })

   }


}
