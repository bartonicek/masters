import * as examples from "./examples.js";
document
    .querySelector(".buttonHelp")
    .addEventListener("click", (event) => {
    document
        .querySelector(".sidePanelHelp")
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
