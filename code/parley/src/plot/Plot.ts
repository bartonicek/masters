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
  scales: { [key: string]: scls.Scale };
  representations: { [key: string]: reps.Representation };
  auxiliaries: { [key: string]: auxs.Auxiliary };
  wranglers: { [key: string]: Wrangler };
  handlers: { drag: hndl.RectDragHandler; keypress: hndl.KeypressHandler };
  freeze: boolean;

  constructor(marker: Marker) {
    super();
    this.marker = marker;
    this.representations = {};
    this.auxiliaries = {};
    this.wranglers = {};
    this.scales = {};
    this.handlers = {
      drag: new hndl.RectDragHandler(),
      keypress: new hndl.KeypressHandler(),
    };
    this.freeze = false;
  }

  get active() {
    return this.graphicContainer.classList.contains("active");
  }

  // Calls a method [string] on each child of a property [string]
  // e.g. call method "drawBase" on each child of "representations"
  callChildren = (object: keyof this, fun: string, ...args: any[]) => {
    const obj = this[object];
    Object.keys(obj).forEach((child) => {
      obj[child][fun] ? obj[child][fun](...args) : null;
    });
  };

  // Returns a result of a function [string] from each child of a property [string]
  // e.g. return selected points from each representation
  mapChildren = (object: keyof this, fun: string, ...args: any[]) => {
    const obj = this[object];
    return Object.keys(obj).map((child) => {
      return obj[child][fun] ? obj[child][fun](...args) : null;
    });
  };

  // Gets all unique values of a mapping [string], across all wranglers
  getUnique = (mapping: string) => {
    const { wranglers } = this;
    const arr = Object.keys(wranglers).flatMap(
      (name) => wranglers[name][mapping].extract() ?? []
    );
    return Array.from(new Set(arr));
  };

  // Given an array of selection points, checks each representation
  inSelection = (selPoints: [number, number][]) => {
    const { mapChildren } = this;
    const allPoints = mapChildren("representations", "inSelection", selPoints);
    return allPoints[0].map((_, i) => allPoints.some((points) => points[i]));
  };

  onSelection = () => {
    const { marker, handlers, inSelection } = this;

    if (handlers.keypress.current === "ShiftLeft") {
      marker.softReceive(inSelection(handlers.drag.selectionPoints));
    } else {
      marker.hardReceive(inSelection(handlers.drag.selectionPoints));
    }
  };

  onKeypress = () => {
    const { handlers, callChildren } = this;

    this.freeze = handlers.keypress.current === "ShiftLeft" ? true : false;
    if (this.active) {
      callChildren("representations", "onKeypress", handlers.keypress.current);
    }
    callChildren("handlers", "onKeyPress", handlers.keypress.last);
  };

  onKeyRelease = () => {
    const { handlers, callChildren } = this;

    if (this.active) {
      callChildren("representations", "onKeyRelease", handlers.keypress.last);
    }
    callChildren("handlers", "onKeyRelease", handlers.keypress.last);
  };

  onDoubleClick = () => {
    this.callChildren("handlers", "onDoubleClick");
  };

  draw = (context: "base" | "highlight" | "user", ...args: any[]) => {
    const { representations, auxiliaries, callChildren } = this;
    const what = "draw" + funs.capitalize(context);
    const where = "graphic" + funs.capitalize(context);
    callChildren("representations", what, this[where], ...args);
    callChildren("auxiliaries", what, this[where], ...args);
  };

  drawBase = () => this.draw("base");
  drawHighlight = () => this.draw("highlight");
  drawUser = () => {
    this.active || !this.freeze ? this.draw("user") : null;
  };

  activateAll = () => {
    const graphicContainers = document.querySelectorAll(".graphicContainer");
    graphicContainers.forEach((e) => e.classList.add("active"));
  };

  deactivateAll = () => {
    const graphicContainers = document.querySelectorAll(".graphicContainer");
    graphicContainers.forEach((e) => e.classList.remove("active"));
  };

  initialize = () => {
    const {
      marker,
      handlers,
      scales,
      auxiliaries,
      representations,
      callChildren,
      onSelection,
      onKeypress,
      onKeyRelease,
      drawBase,
      drawHighlight,
      drawUser,
      graphicContainer,
    } = this;

    Object.keys(scales).forEach((mapping) => {
      scales[mapping]?.registerData(this.getUnique(mapping));
    });

    callChildren("representations", "registerScales", scales);
    callChildren("auxiliaries", "registerScales", scales);
    handlers.drag.registerCallbacks([onSelection], ["whileDrag"]);
    handlers.keypress.registerCallbacks(
      [onKeypress, onKeyRelease, drawBase, drawHighlight],
      ["keyPressed", "keyReleased", "keyPressed", "keyPressed"]
    );
    marker.registerCallbacks(drawHighlight, drawUser);

    // For each handler, register event listeners for actions
    // and corresponding consequences on the graphiContainer
    Object.keys(handlers).forEach((name) => {
      const handler = handlers[name];
      handler?.actions?.forEach((action, index) => {
        graphicContainer.addEventListener(
          action,
          funs.throttle(handler[handler.consequences[index]], 50)
        );
      });
    });

    handlers.keypress.actions.forEach((action, index) => {
      document.body.addEventListener(action, (event) => {
        handlers.keypress[handlers.keypress.consequences[index]](event);
      });
    });

    const graphicContainers = document.querySelectorAll(".graphicContainer");
    const graphicDiv = document.querySelector<HTMLElement>(".graphicDiv");

    graphicDiv.addEventListener("dblclick", (event) => {
      this.activateAll();
      marker.unSelect();
      this.onDoubleClick();
      this.deactivateAll();
    });

    graphicContainer.addEventListener("mousedown", (event) => {
      this.deactivateAll();
      (event.currentTarget as HTMLElement).classList.add("active");
    });

    drawBase();
  };
}
