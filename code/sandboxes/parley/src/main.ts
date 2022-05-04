import { AxisBox } from "./bodies/AxisBox.js";
import { Bars } from "./bodies/Bars.js";
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
  ["x", "cyl"],
  ["y", "mpg"],
]);

const mapping2 = new Map([
  ["x", "gear"],
  ["y", "hp"],
]);

const marker1 = new Marker(n);
const plot1 = new Plot(data1, mapping1, marker1);
const plot2 = new Plot(data1, mapping2, marker1);

console.log(plot1.bodies.bars1.stat.y);
console.log(plot1.uniqueY);

//plot1.graphicBase.drawPoints([100, 200, 300], [100, 200, 300], false, "red");
//const scale1 = new ScaleContinuous([1, , 1, 2, 3, 1, 2, 3, 2], 400);

const arr1 = [1, 1, 1, 2, 2, 3, 3, 3];
const arr2 = [2, 4, 2, 6, 7, 1, 5, 2];
