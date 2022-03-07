export class DragHandler {

    constructor(container, drawFun, context) {
        
        this.container = container
        this.dragging = false
        this.initialize()
    }

    startDrag(event) {
        this.dragging = true
        this.x0 = event.offsetX
        this.y0 = event.offsetY
    }

    whileDrag(event) {
        if (this.dragging) {
            this.x1 = event.offsetX
            this.y1 = event.offsetY    
        }
    }

    endDrag(event) {
        this.dragging = false
    }

    initialize() {
        this.container.addEventListener('mousedown', this.startDrag)
        this.container.addEventListener('mousemove', this.whileDrag)
        this.container.addEventListener('mouseup', this.endDrag)
    }
}