export class Plot {

    constructor(height, width, col) {
        this.dims = {height, width}
        this.coords = {xmin : 0, ymin : 0, xmax : 100, ymax : 100}
        this.gpars = {panel_bg : col}
        this.geoms = []
    }

    initialize() {

        const canvas = document.createElement('canvas')        
        canvas.width = this.dims.width
        canvas.height = this.dims.height
        document.body.appendChild(canvas)

        const context = canvas.getContext('2d')
        context.save()
        context.fillStyle = this.gpars.panel_bg
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()

        this.canvas = canvas
        this.context = context        
    }

    draw() {
        this.geoms.forEach(e => e.draw(this.context, 
            this.dims, this.coords))
    }
}