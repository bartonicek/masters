
export class Bars {

    constructor(col = 'steelblue', 
                outline = undefined,
                width = 10) {
        this.col = col
        this.outline = outline
        this.width = width
    }

    draw(data, mapping, axes, context) {

        const xtemp = data[mapping.get('x')]

        const xvals = [...new Set(xtemp)].sort((a, b) => a - b) // Unique x's
        const xcounts = xvals.map(e => xtemp.filter(f => f === e).length) // Counts

        const bot = axes.y.dataToPx([0])[0]
        const x = axes.x.dataToPx(xvals)
        const y = axes.y.dataToPx(xcounts).map(e => bot - e)

        context.save()

        x.forEach((e, i) => {
            context.fillStyle = this.col
            context.fillRect(e, bot, this.width, -y[i])
        })

        context.restore()
    }  
}
