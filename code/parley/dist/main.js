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
    ["size", "am"],
]);
const wrangleMapping = new Map([
    ["points1", "identity1"],
    ["bars1", "summary1"],
]);
//console.log(Array.from(wrangleMapping.keys()).map((e) => wrangleMap.get(e)));
const marker1 = { label: "ADD MARKER" };
const plot1 = new Plot(data1, mapping1, marker1);
