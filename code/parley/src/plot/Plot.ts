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

  getUnique = (variable: string) => {
    const values = [].concat(
      Object.keys(this.wranglers).flatMap((e) =>
        this.wranglers[e][variable].extract()
      )
    );
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
    const allPoints = this.mapChildren(
      this.representations,
      "inSelection",
      selectionPoints
    );
    return allPoints[0].map((_, i) => allPoints.some((e) => e[i]));
  };

  updateMarker = (selected: number[]) => {
    this.marker.hardReceive(selected);
  };

  onSelection = () => {
    // THIS IS STILL HARDCODED - NEED TO FIGURE OUT HOW TO DO FOR MULTIPLE HANDLERS?
    this.updateMarker(
      this.inSelection(this.handlers.draghandler.selectionPoints)
    );
  };

  onKeypress = (key: string) => {
    if (key === "KeyR") this.mapChildren(this.representations, "defaultize");
    this.callChildren(this.representations, "onKeypress", key);
  };

  initialize = () => {
    Object.keys(this.scales).forEach((mapping) =>
      this.scales[mapping]?.registerData(this.getUnique(mapping))
    );

    this.callChildren(this.representations, "registerScales", this.scales);
    this.callChildren(this.auxiliaries, "registerScales", this.scales);

    this.drawBase();

    this.callChildren(this.handlers, "registerCallback", this.onSelection);
    this.marker.registerCallback(this.drawHighlight);
    this.marker.registerCallback(this.drawUser);

    Object.keys(this.handlers).forEach((handlerName) => {
      const handler = this.handlers[handlerName];
      handler?.actions?.forEach((action, index) => {
        this.graphicContainer.addEventListener(action, (event) => {
          handler[handler.consequences[index]](event);
        });
      });
    });

    document.body.addEventListener("keyup", (event) => {
      if (this.active) {
        this.handlers.keypresshandler?.reportKey(event);
        this.onKeypress(
          (this.handlers?.keypresshandler as hndl.KeypressHandler)?.lastPressed
        );
        this.drawBase();
        this.graphicHighlight.drawClear();
        //this.drawUser();
      }
    });

    document.body.addEventListener("dblclick", (event) => {
      this.graphicHighlight.drawClear();
      this.graphicUser.drawClear();
      this.active = this.active ? true : false;
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
