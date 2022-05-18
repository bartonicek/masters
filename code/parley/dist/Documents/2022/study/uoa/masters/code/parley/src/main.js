import { Marker } from "./marker/Marker.js";
import * as funs from "./functions.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { BarPlot } from "./plot/BarPlot.js";
import { Recastable } from "./Recastable.js";
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
//console.log(bb.flatMap((e) => e.map((f) => plot1.wranglers.identity.x[f])));
//console.log(plot3.wranglers);
class Variable {
    data;
    indices;
    marker;
    fun;
    constructor(data, indices, marker, fun) {
        this.data = data;
        this.indices = indices;
        this.marker = marker;
        this.fun = fun;
    }
    subsetOnIndices = (x, indices) => {
        return indices.map((e) => x[e]);
    };
    get all() {
        return this.indices.map((e) => this.fun(this.subsetOnIndices(this.data, e)));
    }
    get selected() {
        const filteredIndices = this.indices.map((e) => e.filter((f) => this.marker.selected.indexOf(f) !== -1));
        return filteredIndices.map((e) => e.length > 0 ? this.fun(this.subsetOnIndices(this.data, e)) : null);
    }
}
marker1.selected = [1, 3, 4];
//console.log(marker1.selected);
const aa = new Variable([20, 21, 22, 23, 25], [[0, 1], [2], [3, 4]], marker1, funs.sum);
const arr1 = [1, 10, 11, 15, 3, 3, 4, 2, 1];
const arr2 = [1, 1, 1, 2, 2, 1, 3, 3, 3];
// const splitByGroup = (data: any[], indices: number[]) => {
//   return Array.from(new Set(indices)).map((uniqueIndex) =>
//     indices.flatMap((f, j) => (f === uniqueIndex ? j : [])).map((g) => data[g])
//   );
// };
const bb = new Recastable(arr1, arr2, arr2);
