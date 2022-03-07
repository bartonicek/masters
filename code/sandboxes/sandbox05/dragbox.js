import { DragHandler } from "./draghandler.js";

export class DragBox {

    constructor(context, container) {
        this.context = context
        this.dragHandler = new DragHandler(container)
        this.initialize()
    }

    initialize() {
        "mousedown mousemove mouseup".split(" ").forEach(e => {
            this.dragHandler.container.addEventListener(e, () => this.draw())
        })
    }

    draw() {
        const {x0, y0, x1, y1} = this.DragHandler
        context.fillStyle = 'rgba(100, 100, 100, 0.25)'
        context.fillRect(x0, y0, x1 - x0, y1 - y0)
    }

}