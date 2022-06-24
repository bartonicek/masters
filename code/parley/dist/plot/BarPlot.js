import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class BarPlot extends Plot {
    constructor(data, mapping, marker) {
        super(marker);
        this.wranglers = {
            summary: new Wrangler(data, mapping, marker)
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
            bars: new reps.Bars(this.wranglers.summary, this.handlers.drag, 0.8)
        };
        this.auxiliaries = {
            axisbox: new auxs.AxisBox(),
            axistextx: new auxs.AxisText("x"),
            axistexy: new auxs.AxisText("y"),
            axistitlex: new auxs.AxisTitle("x", mapping.get("x")),
            //axistitley: new auxs.AxisTitle("y", mapping.get("y")),
            rectdragbox: new auxs.RectDragBox(this.handlers),
        };
        this.initialize();
    }
}
