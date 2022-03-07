export class Points {
    
    constructor(data, mapping, scales) {
        this.dataX = data[mapping.get('x')]
        this.dataY = data[mapping.get('y')]
        this.scales = scales
        this.radius = 5
    }

    get plotX() {
        return this.scales.x.dataToPlot(this.dataX)
    }

    get plotY() {
        return this.scales.y.dataToPlot(this.dataY)
    }

    draw(x, y, col, context, transp) {

        context.save()
        
        context.fillStyle = col

        if (transp === true) context.clearRect(0, 0, 400, 400)

        x.forEach((e, i) => {
            context.beginPath()
            context.arc(e, y[i], this.radius, 0, Math.PI * 2)
            context.fill()
        })

        context.restore()
    }

    drawBase(base) {

        const x = this.plotX
        const y = this.plotY
        
        this.draw(x, y, 'firebrick', base.context)

    }

    drawHighlight(highlight, selected) {

        const x = this.plotX.filter((e, i) => selected[i])
        const y = this.plotY.filter((e, i) => selected[i])

        this.draw(x, y, 'steelblue', highlight.context, true)

    }
}