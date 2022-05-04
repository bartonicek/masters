import { Plot } from "./plot/Plot.js";
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
const bb = plot1.extractChildren(plot1.statistics, "y");
const bbc = Array.from(new Set([].concat(...bb)));
console.log(bbc);
