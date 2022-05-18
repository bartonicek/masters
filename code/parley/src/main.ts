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
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { BarPlot } from "./plot/BarPlot.js";
import { Recastable } from "./Recastable.js";

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
  ["x", "gear"],
  ["y", "disp"],
]);

const mapping3: dtstr.Mapping = new Map([
  ["x", "cyl"],
  ["y", "disp"],
]);

const marker1 = new Marker(data1[Object.keys(data1)[0]].length);

const plot1 = new ScatterPlot(data1, mapping1, marker1);
const plot2 = new ScatterPlot(data1, mapping2, marker1);
const plot3 = new BarPlot(data1, mapping3, marker1);

const arr1 = [1, 10, 11, 15, 3, 3, 4, 2, 1];
const arr2 = [0, 0, 0, 1, 1, 1, 2, 2, 2];
const arr3 = [1, 1, 0, 0, 1, 0, 0, 1, 1];

const bb = new Recastable(arr1, arr2, arr3, funs.mean);
console.log(bb.defaultSplit);
console.log(bb.selectedSplit);

export {};
