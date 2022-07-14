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
import { Cast } from "./wrangler/Cast.js";
import { AxisText } from "./auxiliaries/AxisText.js";
import { BubblePlot } from "./plot/BubblePlot.js";
import { HistoPlot } from "./plot/HistoPlot.js";

document
  .querySelector<HTMLElement>(".buttonHelp")
  .addEventListener("click", (event) => {
    document
      .querySelector<HTMLElement>(".sidePanelHelp")
      .classList.toggle("sidePanelHelpActive");
  });

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
  ["y", "am"],
  ["size", "mpg"],
]);

const mapping4: dtstr.Mapping = new Map([
  ["x", "mpg"],
  ["y", "wt"],
]);

const marker1 = new Marker(data1[Object.keys(data1)[0]].length);

const plot1 = new ScatterPlot(data1, mapping1, marker1);
const plot2 = new BubblePlot(data1, mapping3, marker1);
const plot3 = new BarPlot(data1, mapping2, marker1);
const plot4 = new HistoPlot(data1, mapping4, marker1);

// const data1 = await getData("gapminder.json");
// const marker1 = new Marker(data1[Object.keys(data1)[0]].length);
// console.log(Object.keys(data1));

// const mapping1: dtstr.Mapping = new Map([
//   ["x", "pop"],
//   ["y", "lifeExp"],
// ]);

// const mapping2: dtstr.Mapping = new Map([
//   ["x", "continent"],
//   ["y", "year"],
// ]);

// const mapping3: dtstr.Mapping = new Map([
//   ["x", "gdpPercap"],
//   ["y", "year"],
// ]);

// const plot1 = new ScatterPlot(data1, mapping1, marker1);
// const plot2 = new BarPlot(data1, mapping2, marker1);
// const plot3 = new HistoPlot(data1, mapping3, marker1);

// const arr1 = Array.from(Array(100), (e) => Math.floor(100 * Math.random()));

// const data1 = await getData("diamonds.json");

// const mapping1: dtstr.Mapping = new Map([
//   ["x", "carat"],
//   ["y", "price"],
// ]);

// const mapping2: dtstr.Mapping = new Map([
//   ["x", "clarity"],
//   ["y", "price"],
// ]);

// const mapping3: dtstr.Mapping = new Map([
//   ["x", "color"],
//   ["y", "cut"],
//   ["size", "price"],
// ]);

// const marker1 = new Marker(data1.price.length);

// const plot2 = new BarPlot(data1, mapping2, marker1);
// const plot1 = new ScatterPlot(data1, mapping1, marker1);
// const plot3 = new BubblePlot(data1, mapping3, marker1);

export {};
