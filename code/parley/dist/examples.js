import { Scene } from "./Scene.js";
import { Mapping } from "./Mapping.js";
import { DataFrame } from "./DataFrame.js";
const getData = async (path) => {
    const response = await fetch(path);
    return response.json();
};
const dataMtcars = await DataFrame.getData("mtcars.json");
const dataMpg = await DataFrame.getData("mpg.json");
const dataGapminder = await DataFrame.getData("gapminder.json");
const dataDiamonds = await DataFrame.getData("diamonds.json");
function mtcars() {
    const scene = new Scene(dataMtcars)
        .addPlotWrapper("histo", new Mapping(["x", "mpg"], ["y", "_indicator"]))
        .addPlotWrapper("scatter", new Mapping(["x", "wt"], ["y", "mpg"]))
        .addPlotWrapper("square", new Mapping(["x", "cyl"], ["y", "am"], ["size", "_indicator"]))
        .addPlotWrapper("bar", new Mapping(["x", "carb"], ["y", "_indicator"]));
    return scene;
}
function mpg() {
    const scene = new Scene(dataMpg)
        // .addPlotWrapper(
        //   "bar",
        //   new Mapping(["x", "manufacturer"], ["y", "_indicator"])
        // )
        .addPlotWrapper("histo", new Mapping(["x", "cty"], ["y", "_indicator"]))
        .addPlotWrapper("scatter", new Mapping(["x", "displ"], ["y", "hwy"]));
    return scene;
}
const gapminder = () => {
    const scene = new Scene(dataGapminder)
        .addPlotWrapper("scatter", new Mapping(["x", "pop"], ["y", "lifeExp"]))
        .addPlotWrapper("histo", new Mapping(["x", "gdpPercap"], ["y", "_indicator"]))
        .addPlotWrapper("bar", new Mapping(["x", "continent"], ["y", "_indicator"]));
    return scene;
};
const diamonds = () => {
    const scene = new Scene(dataDiamonds)
        .addPlotWrapper("scatter", new Mapping(["x", "carat"], ["y", "price"]))
        .addPlotWrapper("histo", new Mapping(["x", "price"], ["y", "_indicator"]));
    return scene;
    // .addPlotWrapper(
    //   "bubble",
    //   new Mapping(["x", "color"], ["y", "cut"], ["size", "price"])
    // );
};
// const diamonds = () => {
//   const n = dataDiamonds[Object.keys(dataDiamonds)[0]].length;
//   const marker1 = new MarkerHandler(n);
//   const mapping1: dtstr.Mapping = new Map([
//     ["x", "carat"],
//     ["y", "price"],
//   ]);
//   const mapping2: dtstr.Mapping = new Map([
//     ["x", "clarity"],
//     ["y", "price"],
//   ]);
//   const mapping3: dtstr.Mapping = new Map([
//     ["x", "color"],
//     ["y", "cut"],
//     ["size", "price"],
//   ]);
//   const plot1 = new ScatterPlot(dataDiamonds, mapping1, marker1);
//   const plot2 = new BarPlot(dataDiamonds, mapping2, marker1);
//   const plot3 = new BubblePlot(dataDiamonds, mapping3, marker1);
// };
export { mtcars, mpg, gapminder, diamonds };
