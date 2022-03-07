import { Plot } from "./plot.js"

export class Scene {

    constructor(data, mappings) {

        this.data = data
        this.mappings = mappings
        this.plots = {plot1 : new Plot(this.data, this.mappings.mapping1),
                      plot2 : new Plot(this.data, this.mappings.mapping1)}
        this.selected = Array.from(Array(this.data.n)).map(e => false)
        this.initialize()

    }

    initialize() {

        Object.keys(this.plots).forEach(e => {
            this.plots[e].dragHandler.selected = this.selected
        })
    
    }

}