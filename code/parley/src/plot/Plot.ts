import * as datastr from "./../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
import * as reps from "../representations/representations.js";
import * as scls from "../scales/scales.js";
import * as auxs from "../auxiliaries/auxiliaries.js";
import * as hndl from "../handlers/handlers.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Marker } from "../marker/Marker.js";

export class Plot extends GraphicStack {
  marker: Marker;
  active: boolean;
  scales: { [key: string]: scls.Scale };
  representations: { [key: string]: reps.Representation };
  auxiliaries: { [key: string]: auxs.Auxiliary };
  wranglers: { [key: string]: Wrangler };
  handlers: { [key: string]: hndl.Handler };

  constructor(marker: Marker) {
    super();
    this.active = false;
    this.marker = marker;
    this.representations = {};
    this.auxiliaries = {};
    this.wranglers = {};
    this.scales = {};
    this.handlers = {};
  }

  // Extract a property from each child
  extractChildren = (object: object, what: string) => {
    return Object.keys(object).map((e) => object?.[e]?.[what]);
  };

  // Call each child w/o returning anything
  callChildren = (object: object, fun: string, ...args: any[]) => {
    Object.keys(object).forEach((child) => {
      object[child][fun] ? object[child][fun](...args) : null;
    });
  };

  // Return something for each child
  mapChildren = (object: object, fun: string, ...args: any[]) => {
    return Object.keys(object).map((child) => {
      return object[child][fun] ? object[child][fun](...args) : null;
    });
  };

  getValues = (variable: string) => {
    const values = [].concat(...this.extractChildren(this.wranglers, variable));
    return Array.from(new Set(values));
  };

  draw = (context: "base" | "highlight" | "user", ...args: any[]) => {
    const what = "draw" + funs.capitalize(context);
    const where = "graphic" + funs.capitalize(context);
    this.callChildren(this.representations, what, this[where], ...args);
    this.callChildren(this.auxiliaries, what, this[where], ...args);
  };

  drawBase = () => this.draw("base");
  drawHighlight = () => this.draw("highlight", this.marker.selected);
  drawUser = () => this.draw("user");

  inSelection = (selectionPoints: number[]) => {
    const allPoints = [].concat(
      ...this.mapChildren(this.representations, "inSelection", selectionPoints)
    );
    return Array.from(new Set(allPoints));
  };

  updateMarker = (dataPoints: number[]) => {
    this.marker.hardReceive(dataPoints);
  };

  onSelection = (handler: hndl.Handler) => {
    this.updateMarker(this.inSelection(handler.selectionPoints));
  };

  initialize = () => {
    Object.keys(this.scales).forEach((mapping) =>
      this.scales[mapping]?.registerData(this.getValues(mapping))
    );

    this.callChildren(this.representations, "registerScales", this.scales);
    this.callChildren(this.auxiliaries, "registerScales", this.scales);

    this.drawBase();

    ["onSelection", "drawHighlight"].forEach((e) =>
      this.handlers.draghandler1.registerCallback(this[e])
    );

    Object.keys(this.handlers).forEach((handlerName) => {
      const handler = this.handlers[handlerName];
      handler.actions.forEach((action, index) => {
        this.graphicContainer.addEventListener(action, (event) => {
          handler[handler.consequences[index]](event);
        });
      });
    });

    document.body.addEventListener("dblclick", (event) => {
      this.graphicHighlight.drawClear();
      this.graphicUser.drawClear();
      this.active = false;
    });

    document.body.addEventListener("mousedown", (event) => {
      this.active = document
        .getElementById(this.id)
        .contains(event.target as Node)
        ? true
        : false;
    });
  };
}
