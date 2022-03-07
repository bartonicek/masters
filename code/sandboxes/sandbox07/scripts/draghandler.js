
export class DragHandler {
    
    constructor(plotBox, context) {
        
        this.plotBox = plotBox
        this.context = context
        this.dragging = false
        this.x0 = 0
        this.y0 = 0
        this.x1 = 0
        this.y1 = 0
        
        this.width = parseInt(getComputedStyle(this.plotBox).width, 10)
        this.height = parseInt(getComputedStyle(this.plotBox).height, 10)
        
        this.initialize()

    }

    startDrag(event) {

        this.dragging = true
        this.x0 = event.offsetX
        this.y0 = event.offsetY
    
    }

    whileDrag(event) {

        if (this.dragging === true) {
            this.x1 = event.offsetX
            this.y1 = event.offsetY

            const {x0, y0, x1, y1, context} = this

            this.selected = this.selected.map((e, i) => {
                return this.inRange(this.plotX[i], x0, x1) &&  
                        this.inRange(this.plotY[i], y0, y1)
            })

            context.save()
            context.clearRect(0, 0, this.width, this.height)
            context.fillStyle = 'rgba(0, 0, 0, 0.05)'
            context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
            context.fillRect(x0, y0, x1 - x0, y1 - y0)
            context.strokeRect(x0, y0, x1 - x0, y1 - y0)
            context.restore()

        }
    }

    endDrag(event) {
        
        this.dragging = false

        const context = this.context

            setTimeout(() => {
                context.save()
                context.clearRect(0, 0, this.width, this.height)
                context.restore()    
            }, 150)
            
    }

    inRange(x, a, b) {
        return ((x - a) * (x - b)) <= 0
    }

    initialize() {

        const mouseEvents = ['mousedown', 'mousemove', 'mouseup']
        const dragActions = ['startDrag', 'whileDrag', 'endDrag']

        mouseEvents.forEach((e, i) => {
            this.plotBox.addEventListener(e, event => {
                window.requestAnimationFrame(this[dragActions[i]](event))
            })            
        });
        
    }
}