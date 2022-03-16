export class Axis {

    constructor(scales) {

        this.scales = scales

    }

    draw(context) {

        const x0 = this.scales.x.dataToPlot(this.scales.x.min) 
        const x1 = this.scales.x.dataToPlot(this.scales.x.max)
        const y0 = this.scales.y.dataToPlot(this.scales.y.min)
        const y1 = this.scales.y.dataToPlot(this.scales.y.max)

        context.save()
        context.beginPath()
        context.moveTo(x0, y0)
        context.lineTo(x1, y0)
        context.moveTo(x0, y0)
        context.lineTo(x0, y1)
        context.stroke()
        context.restore()

    }

    drawBase(base) {

        this.draw(base)

    }


}