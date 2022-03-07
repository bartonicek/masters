export class PlotStack {

    constructor() {

        this.plotBox = document.createElement('div')
        
        this.base = {}
        this.highlight = {}
        this.user = {}   
        
        this.#initialize() 
    }

    #initialize() {

        document.body.appendChild(this.plotBox)
        this.plotBox.setAttribute('class', 'plotBox')

        this.width = parseInt(getComputedStyle(this.plotBox).width, 10)
        this.height = parseInt(getComputedStyle(this.plotBox).height, 10)
        
        const layers = ['base', 'highlight', 'user']
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
        this.plotBox.appendChild(canvas)

        canvas.width = this.width
        canvas.height = this.height           
   
    }

}
