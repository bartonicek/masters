import { vectorize } from "./helpers.js"

export class Points {

    constructor(col = 'steelblue', size = [5]) {
        this.col = col
        this.size = size
    }

    draw(data, mapping, axes, context) {

        const x = axes.x.dataToPx(data[mapping.get('x')])
        const y = axes.y.dataToPx(data[mapping.get('y')]) 

        const size = vectorize(this.size, x.length)
        const col = vectorize(this.col, x.length)

        context.save()

        x.forEach((e, i) => {
            context.fillStyle = col[i]
            context.beginPath()
            context.arc(e, y[i], size[i], 0, Math.PI * 2)
            context.fill()
        });
        
        context.restore()
    }
}