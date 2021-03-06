import { Marker } from "./marker/Marker.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { BarPlot } from "./plot/BarPlot.js";
import { BubblePlot } from "./plot/BubblePlot.js";
import { HistoPlot } from "./plot/HistoPlot.js";
document
    .querySelector(".buttonHelp")
    .addEventListener("click", (event) => {
    document
        .querySelector(".sidePanelHelp")
        .classList.toggle("sidePanelHelpActive");
});
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
    ["y", "am"],
    ["size", "mpg"],
]);
const mapping4 = new Map([
    ["x", "mpg"],
    ["y", "wt"],
]);
const marker1 = new Marker(data1[Object.keys(data1)[0]].length);
const plot1 = new ScatterPlot(data1, mapping1, marker1);
const plot2 = new BubblePlot(data1, mapping3, marker1);
const plot3 = new BarPlot(data1, mapping2, marker1);
const plot4 = new HistoPlot(data1, mapping4, marker1);
