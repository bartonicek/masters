import * as dtstr from "../datastructures.js";
import * as hndl from "../handlers/handlers.js";
import * as scls from "../scales/scales.js";
import * as reps from "../representations/representations.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import { Marker } from "../marker/Marker.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Plot } from "./Plot.js";

export class ScatterPlot extends Plot {
  constructor(data: dtstr.DataFrame, mapping: dtstr.Mapping, marker: Marker) {
    super(marker);

    this.wranglers = {
      identity: new Wrangler(data, mapping, marker).extractAsIs("x", "y"),
    };

    this.handlers = {
      draghandler: new hndl.RectDragHandler().registerCallback(this.drawUser),
    };

    this.scales = {
      x: new scls.XYScaleContinuous(this.width).registerData(
        this.getValues("x")
      ),
      y: new scls.XYScaleContinuous(this.height, -1).registerData(
        this.getValues("y")
      ),
    };

    this.representations = {
      points: new reps.Points(
        this.wranglers.identity,
        this.handlers.draghandler
      ).registerScales(this.scales),
    };

    this.auxiliaries = {
      axisbox: new auxs.AxisBox().registerScales(this.scales),
      rectdragbox: new auxs.RectDragBox(
        this.handlers.draghandler
      ).registerScales(this.scales),
    };

    this.initialize();
  }
}
