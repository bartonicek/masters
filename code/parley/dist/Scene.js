import * as dtstr from "./datastructures.js";
import * as hndl from "./handlers/handlers.js";
import * as plts from "./plot/plots.js";
export class Scene {
    data;
    nObs;
    nPlots;
    nPlotsOfType;
    plots;
    plotIds;
    handlers;
    constructor(data) {
        this.data = data;
        this.nObs = data[Object.keys(data)[0]].length;
        this.nPlots = 0;
        this.nPlotsOfType = Array(dtstr.plotTypeArray.length).fill(0);
        this.plots = {};
        this.plotIds = [];
        this.handlers = {
            marker: new hndl.MarkerHandler(this.nObs),
            keypress: new hndl.KeypressHandler(),
            state: new hndl.StateHandler(),
        };
        this.handlers.state.keypressHandler = this.handlers.keypress;
        document
            .querySelector(".buttonHelp")
            .addEventListener("click", (event) => {
            document
                .querySelector(".sidePanelHelp")
                .classList.toggle("sidePanelHelpActive");
        });
    }
    addPlotWrapper = (plotType, mapping) => {
        const { data, handlers, plotIds } = this;
        const plotTypeIndex = dtstr.plotTypeArray.findIndex((e) => e === plotType);
        this.nPlotsOfType[plotTypeIndex]++;
        const plotId = `${plotType}${this.nPlotsOfType[plotTypeIndex]}`;
        this.plots[`${plotType}${this.nPlotsOfType[plotTypeIndex]}`] =
            new PlotProxy(plotType, plotId, data, mapping, handlers);
        plotIds.push(plotId);
        handlers.state.plotIds.push(plotId);
        handlers.state.plotsActive.push(false);
        handlers.state.plotContainers.push(this.plots[plotId].graphicContainer);
        return this;
    };
}
// A class that dynamically constructs a wrapper plot given
// a plot type (string), data, mapping, and global handlers
class PlotProxy {
    constructor(plotType, ...args) {
        const plotClasses = {
            scatter: plts.ScatterPlot,
            bubble: plts.BubblePlot,
            bar: plts.BarPlot,
            histo: plts.HistoPlot,
            square: plts.SquarePlot,
        };
        return new plotClasses[plotType](...args);
    }
}
