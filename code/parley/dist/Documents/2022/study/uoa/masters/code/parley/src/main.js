import { Marker } from "./marker/Marker.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { BarPlot } from "./plot/BarPlot.js";
import { BubblePlot } from "./plot/BubblePlot.js";
const getData = async (path) => {
    const response = await fetch(path);
    return response.json();
};
const data1 = await getData("mtcars.json");
const n = data1.mpg.length;
const mapping1 = new Map([
    ["x", "wt"],
    ["y", "mpg"],
]);
const mapping2 = new Map([
    ["x", "cyl"],
    ["y", "disp"],
]);
const mapping3 = new Map([
    ["x", "cyl"],
    ["y", "am"],
    ["size", "mpg"],
]);
const marker1 = new Marker(data1[Object.keys(data1)[0]].length);
const plot1 = new ScatterPlot(data1, mapping1, marker1);
const plot2 = new BubblePlot(data1, mapping3, marker1);
const plot3 = new BarPlot(data1, mapping2, marker1);
// const containers = document.querySelectorAll(".graphicContainer");
// containers.forEach((e) => e.classList.add("active"));
// document.body.addEventListener(
//   "mousedown",
//   (event) => {
//     containers.forEach((e) => e.classList.remove("active"));
//     event.target.classList.add("active");
//     //containers.forEach((e) => console.log(e.classList));
//     //containers.forEach((e) => e.classList.toggle("active"));
//     //event.target.classList.add("active");
//   }
//   //  { capture: false }
// );
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
const arr1 = Array.from(Array(100), (e) => Math.floor(100 * Math.random()));
const bin = (x, n = 20) => {
    const range = Math.max(...x) - Math.min(...x);
    const width = range / n;
    return Array.from(Array(n), (e, i) => Math.min(...x) + i * width);
};
