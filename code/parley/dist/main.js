import { Plot } from "./plot/Plot.js";
import { Scale } from "./scales/Scale.js";
const getData = async (path) => {
    const response = await fetch(path);
    return response.json();
};
const data1 = await getData("mtcars.json");
const n = data1.mpg.length;
const mapping1 = new Map([
    ["x", "cyl"],
    ["y", "mpg"],
]);
const marker1 = { label: "ADD MARKER" };
const plot1 = new Plot(data1, mapping1, marker1);
const scale1 = new Scale(100);
scale1.registerData(data1.cyl);
console.log(scale1);
