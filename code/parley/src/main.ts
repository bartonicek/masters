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
//const plot4 = new HistoPlot(data1, mapping4, marker1);

// class Marker2 {
//   n: number;
//   selected: Uint8Array;

//   constructor(n: number) {
//     this.n = n;
//     this.selected = new Uint8Array(n);
//   }

//   hardReceive = (points: Uint8Array) => {
//     this.selected = points;
//   };

//   softReceive = (points: Uint8Array) => {
//     this.selected = this.selected.map((e, i) =>
//       e === 1 || points[i] === 1 ? 1 : 0
//     );
//   };
// }

// const m1 = new Marker(1e7);
// const arr1 = Array.from(Array(1e5), (e) => true);

// const m2 = new Marker2(1e7);
// const arr2 = Uint8Array.from(Array(1e5), (e) => 1);

// console.log(funs.timeExecution(() => m1.softReceive(arr1)));
// console.log(funs.timeExecution(() => m2.softReceive(arr2)));

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

// const plot1 = new ScatterPlot(data1, mapping1, marker1);
// const plot2 = new BarPlot(data1, mapping2, marker1);

// const arr1 = Array.from(Array(100), (e) => Math.floor(100 * Math.random()));

export {};
