import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class ScatterPlot extends Plot {
    mapping;
    constructor(id, data, mapping, handlers) {
        super(id, data, mapping, handlers);
        this.mapping = mapping;
        this.wranglers = {
            identity: new Wrangler(data, mapping, handlers.marker).extractAsIs("x", "y"),
        };
        this.scales = {
            x: new scls.XYScaleContinuous(this.width),
            y: new scls.XYScaleContinuous(this.height, -1),
        };
        this.representations = {
            points: new reps.Points(this.wranglers.identity),
        };
        this.initialize();
    }
}
