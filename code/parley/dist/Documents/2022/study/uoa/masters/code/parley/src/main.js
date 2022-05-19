import { Marker } from "./marker/Marker.js";
import * as funs from "./functions.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { BarPlot } from "./plot/BarPlot.js";
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
    ["x", "gear"],
    ["y", "disp"],
]);
const mapping3 = new Map([
    ["x", "cyl"],
    ["y", "disp"],
]);
const marker1 = new Marker(data1[Object.keys(data1)[0]].length);
const plot1 = new ScatterPlot(data1, mapping1, marker1);
const plot2 = new ScatterPlot(data1, mapping2, marker1);
const plot3 = new BarPlot(data1, mapping3, marker1);
class Wrangler2 {
    data;
    mapping;
    marker;
    by;
    what;
    indices;
    constructor(data, mapping, marker) {
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.by = new Set();
        this.what = new Set();
    }
    getMapping = (mapping) => {
        return this.data[this.mapping.get(mapping)];
    };
    splitBy = (...mappings) => {
        mappings.forEach((mapping) => this.by.add(mapping));
        const splitData = Array.from(this.by).map((e) => this.getMapping(e));
        return splitData;
    };
    splitWhat = (...mappings) => {
        mappings.forEach((mapping) => this.what.add(mapping));
    };
}
const uniqueRows2 = (data) => {
    // Transpose dataframe from array of cols to array of rows & turn the rows into strings
    const stringRows = data[0].map((_, i) => JSON.stringify(data.map((row) => row[i])));
    const uniqueStringRows = funs.unique(stringRows);
    // const indices = stringValues.map((e) =>
    //   stringDataT.flatMap((f, j) => (f === e ? j : []))
    // );
    // const values = indices.map((e) => {
    //   return data.map((f) => f[e[0]]);
    // });
    // return { values, indices };
    return uniqueStringRows;
};
const dt2 = [data1.cyl, data1.am];
console.log(uniqueRows2(dt2));
const wr1 = new Wrangler2(data1, mapping3, marker1);
