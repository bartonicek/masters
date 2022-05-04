import { Marker } from "./marker/Marker.js";
import { Plot } from "./plot/Plot.js";
console.log("aaabbb");
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
const marker1 = new Marker(n);
const plot1 = new Plot(data1, mapping1, marker1);
