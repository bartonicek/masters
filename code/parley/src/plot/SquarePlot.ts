import * as dtstr from "../datastructures.js";
import * as hndl from "../handlers/handlers.js";
import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as funs from "../functions.js";
import { Marker } from "../marker/Marker.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";

export class SquarePlot extends Plot {
  constructor(data: dtstr.DataFrame, mapping: dtstr.Mapping, marker: Marker) {
    super(marker);

    this.wranglers = {
      identity: new Wrangler(data, mapping, marker)
        .splitBy("x", "y")
        .splitWhat("size")
        .doWithin("by", funs.unique)
        .doWithin("what", funs.length)
        .assignIndices(),
    };

    this.scales = {
      x: new scls.XYScaleDiscrete(this.width),
      y: new scls.XYScaleDiscrete(this.height, -1),
      size: new scls.AreaScaleContinuous(this.width / 5),
    };

    this.representations = {
      points: new reps.Squares(this.wranglers.identity),
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
