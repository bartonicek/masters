import { Marker } from "./marker/Marker.js";
import { Plot } from "./plot/Plot.js";
import * as stats from "./statistics.js";

const getData = async (path: string) => {
  const response = await fetch(path);
  return response.json();
};

const data1 = await getData("mtcars.json");
const n = data1.mpg.length;

const mapping1 = new Map([
  ["x", "wt"],
  ["y", "mpg"],
]);

// class Foo {
//   a: number;
//   b: number;

//   constructor(options: { a: number; b: number }) {
//     ({ a: this.a, b: this.b } = options);
//   }
// }

const repeat = <Type>(x: Type, times: number) => {
  return Array.from(Array(times), () => x);
};

const marker1 = new Marker(n);
const plot1 = new Plot(data1, mapping1, marker1);

//plot1.graphicBase.drawBarsV([50, 150, 250], [200, 300, 200], 350);
//plot1.graphicBase.drawPoints([100, 200, 300], [100, 200, 300], false, "red");
//const scale1 = new ScaleContinuous([1, , 1, 2, 3, 1, 2, 3, 2], 400);

const arr1 = [5, 1, 2, 3, 1, 1, 3];
const arr2 = [2, 4, 2, 6, 7, 1];

//const arr2 = ["b", "b", "b", "a", "a", "a"];

//console.log(stats.bin2(arr2, arr1, "sum", { x: "identity", y: "identity" }));

//const arr3 = [arr1, arr2];
//console.log(arr3.map((e) => Math.max(...e)));

// let arr5 = [];
// Object.keys(plot1.geoms).forEach(
//   (e: string) =>
//     (arr5 = arr5.concat(
//       Math.min(...plot1.geoms[e].statX),
//       Math.max(...plot1.geoms[e].statX)
//     ))
// );

console.log(plot1.geoms.points1.plotX);
