import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class BubblePlot extends Plot {
    constructor(id, data, mapping, handlers) {
        super(id, handlers);
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
            points: new reps.Points(this.wranglers.identity),
        };
        this.auxiliaries = {
            axisbox: new auxs.AxisBox(),
            axistextx: new auxs.AxisText("x"),
            axistexy: new auxs.AxisText("y"),
            axistitlex: new auxs.AxisTitle("x", mapping.get("x")),
            axistitley: new auxs.AxisTitle("y", mapping.get("y")),
            rectdragbox: new auxs.RectDragBox(this.handlers),
        };
        this.initialize();
    }
}
