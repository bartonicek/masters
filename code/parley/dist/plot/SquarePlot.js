import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class SquarePlot extends Plot {
    constructor(id, data, mapping, handlers) {
        super(id, data, mapping, handlers);
        this.wranglers = {
            identity: new Wrangler(data, mapping, handlers.marker)
                .splitBy("x", "y")
                .splitWhat("size")
                .doWithin("by", funs.unique)
                .doWithin("what", funs.length)
                .assignIndices(),
        };
        this.scales = {
            x: new scls.XYScaleDiscrete(this.width),
            y: new scls.XYScaleDiscrete(this.height, -1),
            size: new scls.AreaScaleContinuous(this.width),
        };
        this.representations = {
            points: new reps.Squares(this.wranglers.identity),
        };
        this.initialize();
    }
}
