import * as dtstr from "../datastructures.js";
import * as hndl from "../handlers/handlers.js";
import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as funs from "../functions.js";
import { Marker } from "../marker/Marker.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";

export class BarPlot extends Plot {
  constructor(data: dtstr.DataFrame, mapping: dtstr.Mapping, marker: Marker) {
    super(marker);

    this.wranglers = {
      summary: new Wrangler(data, mapping, marker)
        .splitBy("x")
        .splitWhat("y")
        .doWithin(funs.length),
    };

    this.handlers = {
      draghandler: new hndl.RectDragHandler().registerCallback(this.drawUser),
      keypresshandler: new hndl.KeypressHandler(),
    };

    this.scales = {
      x: new scls.XYScaleDiscrete(this.width),
      y: new scls.XYScaleContinuous(this.height, -1, true),
    };

    this.representations = {
      bars: new reps.Bars(this.wranglers.summary, this.handlers.draghandler, {
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
      rectdragbox: new auxs.RectDragBox(this.handlers.draghandler),
    };

    this.initialize();
  }
}
