import { cart_to_px } from "./helpers.js"

export class Points {

    constructor(x, y, col = 'steelblue', size = 5) {
        this.x = x
        this.y = y
        this.col = col
        this.size = size
    }

    draw(context, dims, coords) {

        context.save()
        context.fillStyle = this.col

        const [new_x, new_y] = cart_to_px(this.x, this.y, dims, coords)

        new_x.forEach((e, i) => {
            context.beginPath()
            context.arc(e, new_y[i], this.size, 0, Math.PI * 2)
            context.fill()
        });
        
        context.restore()
    }
}