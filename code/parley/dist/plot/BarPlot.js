import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class BarPlot extends Plot {
    mapping;
    constructor(id, data, mapping, handlers) {
        super(id, data, mapping, handlers);
        this.mapping = mapping;
        this.wranglers = {
            summary: new Wrangler(data, mapping, handlers.marker)
                .splitBy("x")
                .splitWhat("y")
                .doWithin("by", funs.unique)
                .doWithin("what", funs.length)
                .assignIndices(),
        };
        this.scales = {
            x: new scls.XYScaleDiscrete(this.width),
            y: new scls.XYScaleContinuous(this.height, -1, true),
        };
        this.representations = {
            bars: new reps.Bars(this.wranglers.summary, 0.8),
        };
        this.initialize();
    }
}
