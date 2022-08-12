import { DataFrame } from "./DataFrame.js";
import * as dtstr from "./datastructures.js";
import * as examples from "./examples.js";
import * as funs from "./functions.js";
import { globalParameters } from "./globalparameters.js";
import { Mapping } from "./Mapping.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { Scene } from "./Scene.js";

document
  .querySelector<HTMLElement>(".buttonHelp")
  .addEventListener("click", (event) => {
    document
      .querySelector<HTMLElement>(".sidePanelHelp")
      .classList.toggle("sidePanelHelpActive");
  });

const scene = examples.mtcars();

// class ParameterMap extends Map<string, string | number | ParameterMap> {
//   constructor(...x: [string, string | number | ParameterMap][]) {
//     super([...x]);
//   }

//   retrieve = (...keys: string[]) => {
//     return keys.reduce((a, b) => {
//       return a && a[b];
//     }, this);
//   };
// }
