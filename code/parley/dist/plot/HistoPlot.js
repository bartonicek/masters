import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class HistoPlot extends Plot {
    constructor(id, data, mapping, handlers) {
        super(id, data, mapping, handlers);
        this.wranglers = {
            summary: new Wrangler(data, mapping, handlers.marker)
                .splitBy("x")
                .splitWhat("y")
                .doAcross("by", funs.bin, 10)
                .doWithin("by", funs.unique)
                .doWithin("what", funs.length)
                .assignIndices(),
        };
        this.scales = {
            x: new scls.XYScaleContinuous(this.width),
            y: new scls.XYScaleContinuous(this.height, -1, true),
        };
        this.representations = {
            bars: new reps.Bars(this.wranglers.summary, 1),
        };
        this.initialize();
    }
}
