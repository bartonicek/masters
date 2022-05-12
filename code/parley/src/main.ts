import { Plot } from "./plot/Plot.js";
import { Wrangler } from "./wrangler/Wrangler.js";
import { Marker } from "./marker/Marker.js";
import * as datastr from "./datastructures.js";
import * as reps from "./representations/representations.js";
import * as auxs from "./auxiliaries/auxiliaries.js";
import * as scales from "./scales/scales.js";
import * as handlers from "./handlers/handlers.js";

const getData = async (path: string) => {
  const response = await fetch(path);
  return response.json();
};

const data1 = await getData("mtcars.json");
const n = data1.mpg.length;

const mapping1: datastr.Mapping = new Map([
  ["x", "wt"],
  ["y", "mpg"],
  ["size", "am"],
]);

const marker1 = new Marker(100);
const plot1 = new Plot(marker1);

plot1.wranglers.identity1 = new Wrangler(data1, mapping1).extractAsIs("x", "y");
plot1.handlers.draghandler1 = new handlers.RectDragHandler().registerCallback(
  plot1.drawUser
);

plot1.scales.x = new scales.XYScaleContinuous(plot1.width);
plot1.scales.y = new scales.XYScaleContinuous(plot1.height, -1);
plot1.representations.points1 = new reps.Points();
plot1.representations.points1.registerWrangler(plot1.wranglers.identity1);

plot1.auxiliaries.axisbox1 = new auxs.AxisBox();
plot1.auxiliaries.rectdragbox1 = new auxs.RectDragBox();
plot1.auxiliaries.rectdragbox1.registerHandler(plot1.handlers.draghandler1);

plot1.initialize();

export {};
