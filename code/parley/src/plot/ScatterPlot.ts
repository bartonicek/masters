import * as dtstr from "../datastructures.js";
import * as hndl from "../handlers/handlers.js";
import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import { Marker } from "../marker/Marker.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";

export class ScatterPlot extends Plot {
  mapping: dtstr.Mapping;

  constructor(data: dtstr.DataFrame, mapping: dtstr.Mapping, marker: Marker) {
    super(marker);

    this.mapping = mapping;

    this.wranglers = {
      identity: new Wrangler(data, mapping, marker).extractAsIs("x", "y"),
    };

    this.handlers = {
      draghandler: new hndl.RectDragHandler(),
      keypresshandler: new hndl.KeypressHandler(),
    };

    this.scales = {
      x: new scls.XYScaleContinuous(this.width),
      y: new scls.XYScaleContinuous(this.height, -1),
    };

    this.representations = {
      points: new reps.Points(
        this.wranglers.identity,
        this.handlers.draghandler,
        { width: this.width, height: this.height }
      ),
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
