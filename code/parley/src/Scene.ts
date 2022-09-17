import * as dtstr from "./datastructures.js";
import * as hndl from "./handlers/handlers.js";
import * as plts from "./plot/plots.js";
import { Plot } from "./plot/Plot.js";
import { Mapping } from "./Mapping.js";
import { DataFrame } from "./DataFrame.js";

export class Scene {
  data: DataFrame;
  nObs: number;
  nPlots: number;
  nPlotsOfType: number[];
  plots: { [name: string]: Plot };
  plotIds: string[];
  handlers: {
    marker: hndl.MarkerHandler;
    keypress: hndl.KeypressHandler;
    state: hndl.StateHandler;
  };

  constructor(data: DataFrame) {
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
      .querySelector<HTMLElement>(".buttonHelp")
      .addEventListener("click", (event) => {
        document
          .querySelector<HTMLElement>(".sidePanelHelp")
          .classList.toggle("sidePanelHelpActive");
      });
  }

  addPlotWrapper = (plotType: dtstr.PlotTypes, mapping: Mapping) => {
    const { data, handlers, plotIds } = this;

    const plotTypeIndex = dtstr.plotTypeArray.findIndex((e) => e === plotType);
    this.nPlotsOfType[plotTypeIndex]++;
    const plotId = `${plotType}${this.nPlotsOfType[plotTypeIndex]}`;

    this.plots[`${plotType}${this.nPlotsOfType[plotTypeIndex]}`] =
      new PlotProxy(plotType, plotId, data, mapping, handlers) as Plot;
    plotIds.push(plotId);
    handlers.state.plotIds.push(plotId);
    handlers.state.plotsActive.push(false);
    handlers.state.plotContainers.push(this.plots[plotId].graphicContainer);
    return this;
  };

  // implement addPlotCustom()
}

// A class that dynamically constructs a wrapper plot given
// a plot type (string), data, mapping, and global handlers
class PlotProxy {
  constructor(
    plotType: dtstr.PlotTypes,
    ...args: [
      id: string,
      data: DataFrame,
      mapping: Mapping,
      handlers: {
        marker: hndl.MarkerHandler;
        keypress: hndl.KeypressHandler;
        state: hndl.StateHandler;
      }
    ]
  ) {
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