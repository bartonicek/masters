import * as hndl from "../handlers/handlers.js";
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
        this.handlers = {
            draghandler: new hndl.RectDragHandler().registerCallback(this.drawUser),
        };
        this.scales = {
            x: new scls.XYScaleDiscrete(this.width).registerData(this.getUnique("x")),
            y: new scls.XYScaleDiscrete(this.height, -1).registerData(this.getUnique("y")),
            size: new scls.AreaScaleContinuous(this.width / 10).registerData(this.getUnique("size")),
        };
        this.representations = {
            points: new reps.Points(this.wranglers.identity, this.handlers.draghandler, { width: this.width, height: this.height }).registerScales(this.scales),
        };
        this.auxiliaries = {
            axisbox: new auxs.AxisBox().registerScales(this.scales),
            axistextx: new auxs.AxisText("x"),
            axistexy: new auxs.AxisText("y"),
            rectdragbox: new auxs.RectDragBox(this.handlers.draghandler).registerScales(this.scales),
        };
        this.initialize();
    }
}
