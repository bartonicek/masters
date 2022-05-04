import { CountBars } from "./countbars.js";
import { Marker } from "./marker.js";
import { Plot } from "./plot.js";

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
  ["x", "wt"],
  ["y", "disp"],
]);

const mapping3 = new Map([
  ["x", "am"],
  ["y", "disp"],
]);

const marker1 = new Marker(n);

const plot1 = new Plot(data1, mapping1, marker1);
const plot2 = new Plot(data1, mapping2, marker1);
const plot3 = new Plot(data1, mapping3, marker1);
const plots = { plot1, plot2, plot3 };

// const arr1 = Array.from(Array(10)).map((e, i) => i)
// const arr2 = new Uint8Array(Array.from(Array(10)).map((e, i) => i > 5))

// console.log(arr1.filter((e, i) => arr2[i]))
