export class PlotStack {

    constructor() {

        this.container = document.createElement('div')
        
        this.base = {}
        this.highlight = {}
        this.select = {}   
        
        this.#initialize() 
    }

    #initialize() {

        document.body.appendChild(this.container)
        this.container.setAttribute('class', 'plotContainer')

        this.width = parseInt(getComputedStyle(this.container).width, 10)
        this.height = parseInt(getComputedStyle(this.container).height, 10)
        
        const layers = ['base', 'highlight', 'select']
        layers.forEach(e => this.#makeLayer(e))

        this.base.context.save()
        this.base.context.fillStyle = 'antiquewhite'
        this.base.context.fillRect(0, 0, this.width, this.height)
        this.base.context.restore()

    }

    #makeLayer(name) {

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        this[name] = {canvas, context}
        this.container.appendChild(canvas)

        canvas.width = this.width
        canvas.height = this.height           
   
    }

}
