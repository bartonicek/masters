import { Scene } from "./Scene.js";
import { Mapping } from "./Mapping.js";
const getData = async (path) => {
    const response = await fetch(path);
    return response.json();
};
const dataMtcars = await getData("mtcars.json");
const dataGapminder = await getData("gapminder.json");
const dataDiamonds = await getData("diamonds.json");
function mtcars() {
    const scene = new Scene(dataMtcars)
        .addPlotWrapper("histo", new Mapping(["x", "wt"], ["y", "mpg"]))
        .addPlotWrapper("scatter", new Mapping(["x", "wt"], ["y", "mpg"]))
        .addPlotWrapper("square", new Mapping(["x", "cyl"], ["y", "am"], ["size", "mpg"]))
        .addPlotWrapper("scatter", new Mapping(["x", "hp"], ["y", "drat"]));
    return scene;
}
const gapminder = () => {
    const scene = new Scene(dataGapminder)
        .addPlotWrapper("scatter", new Mapping(["x", "pop"], ["y", "lifeExp"]))
        .addPlotWrapper("bar", new Mapping(["x", "continent"], ["y", "year"]))
        .addPlotWrapper("histo", new Mapping(["x", "gdpPercap"], ["y", "year"]));
    return scene;
};
const diamonds = () => {
    const scene = new Scene(dataDiamonds)
        .addPlotWrapper("scatter", new Mapping(["x", "carat"], ["y", "price"]))
        .addPlotWrapper("bar", new Mapping(["x", "cut"], ["y", "price"]));
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
export { mtcars, gapminder, diamonds };
