import { VectorGeneric } from "./datastructures.js";
import { Plot } from "./plot/Plot.js";
import { Scale } from "./scales/Scale.js";
import { ScaleDiscrete } from "./scales/ScaleDiscrete.js";
import { XYScaleDiscrete } from "./scales/XYScaleDiscrete.js";

const getData = async (path: string) => {
  const response = await fetch(path);
  return response.json();
};

const data1 = await getData("mtcars.json");
const n = data1.mpg.length;

const mapping1 = new Map([
  ["x", "cyl"],
  ["y", "mpg"],
]);

const marker1 = { label: "ADD MARKER" };
const plot1 = new Plot(data1, mapping1, marker1);

console.log(plot1.scales.x.dataToPlot(4));

export {};
