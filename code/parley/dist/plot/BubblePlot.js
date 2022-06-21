import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as funs from "../functions.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";
export class BubblePlot extends Plot {
    constructor(data, mapping, marker) {
        super(marker);
        this.wranglers = {
            identity: new Wrangler(data, mapping, marker)
                .splitBy("x", "y")
                .splitWhat("size")
                .doWithin(funs.length),
        };
        this.scales = {
            x: new scls.XYScaleDiscrete(this.width),
            y: new scls.XYScaleDiscrete(this.height, -1),
            size: new scls.AreaScaleContinuous(this.width / 5),
        };
        this.representations = {
            points: new reps.Points(this.wranglers.identity, this.handlers.drag, {
                width: this.width,
                height: this.height,
            }),
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
