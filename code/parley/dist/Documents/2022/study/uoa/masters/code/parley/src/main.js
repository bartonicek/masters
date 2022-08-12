import * as examples from "./examples.js";
document
    .querySelector(".buttonHelp")
    .addEventListener("click", (event) => {
    document
        .querySelector(".sidePanelHelp")
        .classList.toggle("sidePanelHelpActive");
});
const scene = examples.mtcars();
//const scene = examples.mtcars();
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
// const aa = {
//   c: { d: 1, f: { g: "hello" }, a: 10 },
//   retrieveNested: function (...keys: string[]) {
//     return keys.reduce((a, b) => a && a[b], this);
//   },
//   retrievePeelback: function(...keys: string[]) {
//   }
// };
// console.log(aa.retrieveNested("c", "f", "g"));
