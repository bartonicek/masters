export class Axis {
    
    constructor(scales) {
        this.scales = scales
    }

    drawBase(base) {

        const {x, y} = this.scales
        const xstart = x.dataToPlot(x.min)
        const xend = x.dataToPlot(x.max)
        const ystart = y.dataToPlot(y.min)
        const yend = y.dataToPlot(y.max)

        const context = base.context
        context.save()

        context.beginPath()
        context.moveTo(xstart, ystart)
        context.lineTo(xend, ystart)
        context.moveTo(xstart, ystart)
        context.lineTo(xstart, yend)
        context.stroke()

        context.restore()
        
    }
}