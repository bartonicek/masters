import { Plot } from "./plot/Plot.js";
import { Wrangler } from "./wrangler/Wrangler.js";
import { Marker } from "./marker/Marker.js";
import * as dtstr from "./datastructures.js";
import * as reps from "./representations/representations.js";
import * as auxs from "./auxiliaries/auxiliaries.js";
import * as scls from "./scales/scales.js";
import * as hndl from "./handlers/handlers.js";
import * as funs from "./functions.js";
import { GraphicStack } from "./plot/GraphicStack.js";

const getData = async (path: string) => {
  const response = await fetch(path);
  return response.json();
};

const data1 = await getData("mtcars.json");
const n = data1.mpg.length;

const mapping1: dtstr.Mapping = new Map([
  ["x", "wt"],
  ["y", "mpg"],
]);

const mapping2: dtstr.Mapping = new Map([
  ["x", "cyl"],
  ["y", "disp"],
]);

const marker1 = new Marker(data1[Object.keys(data1)[0]].length);
const plot1 = new Plot(marker1);

plot1.wranglers.identity1 = new Wrangler(data1, mapping1).extractAsIs("x", "y");
plot1.handlers.draghandler1 = new hndl.RectDragHandler().registerCallback(
  plot1.drawUser
);

plot1.scales.x = new scls.XYScaleContinuous(plot1.width);
plot1.scales.y = new scls.XYScaleContinuous(plot1.height, -1);
plot1.representations.points1 = new reps.Points(
  plot1.wranglers.identity1,
  plot1.handlers.draghandler1
);

plot1.auxiliaries.axisbox1 = new auxs.AxisBox();
plot1.auxiliaries.rectdragbox1 = new auxs.RectDragBox(
  plot1.handlers.draghandler1
);

plot1.initialize();

const plot2 = new Plot(marker1);
plot2.wranglers.summary1 = new Wrangler(data1, mapping2)
  .splitBy("x")
  .splitWhat("y")
  .doWithin(funs.mean);
plot2.handlers.draghandler1 = new hndl.RectDragHandler().registerCallback(
  plot2.drawUser
);

plot2.scales.x = new scls.XYScaleDiscrete(plot2.width);
plot2.scales.y = new scls.XYScaleContinuous(plot2.height, -1);
plot2.representations.bars1 = new reps.Bars(plot2.wranglers.summary1);

plot2.auxiliaries.axisbox1 = new auxs.AxisBox();
plot2.auxiliaries.rectdragbox1 = new auxs.RectDragBox(
  plot2.handlers.draghandler1
);

plot2.initialize();

export {};
