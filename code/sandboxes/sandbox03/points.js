export class Points {

    constructor(data, mapping, scales) {
        this.x = data[mapping.get('x')]
        this.y = data[mapping.get('y')]
        this.highlight = Array.from(Array(this.x.length), e => false)
        this.scales = scales
        this.radius = 10
    }

    get dataX() {
        return this.x
    }

    get dataY() {
        return this.y
    }

    get plotX() {
        return this.scales.x.dataToPx(this.dataX)
    }

    get plotY() {
        return this.scales.y.dataToPx(this.dataY)
    }

    draw(canvas, context) {

        context.save()
        context.fillStyle = 'steelblue'
        
        this.plotX.forEach((e, i) => {
            context.beginPath()
            context.arc(e, this.plotY[i], this.radius, 0, Math.PI * 2)
            context.fill()
        })

        context.restore()

        canvas.addEventListener('mousedown', event => {
            this.redraw(canvas, context, event)
        })

    }

    redraw(canvas, context, event) {

        const {plotX, plotY, radius, highlight} = this

        const x = event.offsetX
        const y = canvas.height - event.offsetY

        plotX.map((e, i) => {
            highlight[i] = Math.sqrt((e - x) ** 2 + (plotY[i] - y) ** 2) < radius
        })
        
        context.save()
        
        this.plotX.forEach((e, i) => {
            context.fillStyle = highlight[i] ? 'firebrick' : 'steelblue'
            context.beginPath()
            context.arc(e, this.plotY[i], this.radius, 0, Math.PI * 2)
            context.fill()
        })

        context.restore()

    }

}