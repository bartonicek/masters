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
  id: number;
  scales: { [key: string]: scls.Scale };
  representations: { [key: string]: reps.Representation };
  auxiliaries: { [key: string]: auxs.Auxiliary };
  wranglers: { [key: string]: Wrangler };
  handlers: { drag: hndl.RectDragHandler; keypress: hndl.KeypressHandler };

  static containers = [];
  static drawUserMethods = [];

  static activateAll = () => {
    Plot.containers.forEach((e) => e.classList.add("active"));
  };
  static deactivateAll = () => {
    Plot.containers.forEach((e) => e.classList.remove("active"));
  };
  static drawUser = () => Plot.drawUserMethods.forEach((e) => e());

  static globalModes = {
    or: false,
    not: false,
  };

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
    Plot.containers.push(this.graphicContainer);
    Plot.drawUserMethods.push(this.drawUser);
  }

  get active() {
    return this.graphicContainer.classList.contains("active");
  }

  activate = () => {
    Plot.deactivateAll();
    this.graphicContainer.classList.add("active");
  };

  // Calls a method (string) on each child of a property (string)
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
  inSelection = (selPoints: [number, number][]): number[] => {
    const { mapChildren } = this;
    const allPoints = mapChildren("representations", "inSelection", selPoints);
    return Array.from(new Set([].concat.apply([], allPoints))) as number[];
  };

  startDrag = () => {
    if (Plot.globalModes.or) this.marker.mergeTransient();
  };

  whileDrag = () => {
    const { marker, handlers, inSelection } = this;
    marker.replaceTransient(inSelection(handlers.drag.selectionCurrent), 1);
  };

  endDrag = () => {
    this.marker.mergeTransient();
  };

  onKeypress = () => {
    const { handlers, callChildren } = this;

    if (handlers.keypress.lastPressed === "ShiftLeft")
      Plot.globalModes.or = true;
    callChildren("handlers", "onKeyPress", handlers.keypress.lastPressed);
    if (this.active) {
      callChildren(
        "representations",
        "onKeypress",
        handlers.keypress.lastPressed
      );
    }
  };

  onKeyRelease = () => {
    const { handlers, callChildren } = this;

    if (handlers.keypress.lastPressed === "ShiftLeft")
      Plot.globalModes.or = false;
    callChildren("handlers", "onKeyRelease", handlers.keypress.lastPressed);
    if (this.active) {
      callChildren(
        "representations",
        "onKeyRelease",
        handlers.keypress.lastPressed
      );
    }
  };

  onDoubleClick = () => {
    this.marker.clear();
    this.handlers.drag.clear();
    Plot.activateAll();
    this.drawHighlight();
    this.drawUser();
    Plot.deactivateAll();
  };

  onMouseDown = () => {
    const { marker, activate } = this;
    activate();
    if (!Plot.globalModes.or) {
      marker.clear();
    }
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
    if (this.active || !Plot.globalModes.or) this.draw("user");
  };

  initialize = () => {
    const {
      marker,
      handlers,
      scales,
      callChildren,
      onKeypress,
      onKeyRelease,
      drawBase,
      drawHighlight,
      drawUser,
      startDrag,
      whileDrag,
      endDrag,
      graphicContainer,
    } = this;

    Object.keys(scales).forEach((mapping) => {
      scales[mapping]?.registerData(this.getUnique(mapping));
    });

    callChildren("representations", "registerScales", scales);
    callChildren("auxiliaries", "registerScales", scales);
    handlers.drag.registerCallbacks(
      [startDrag, whileDrag, endDrag],
      ["startDrag", "whileDrag", "endDrag"]
    );
    handlers.keypress.registerCallbacks(
      [onKeypress, onKeyRelease, drawBase, drawHighlight],
      ["keyPressed", "keyReleased", "keyPressed", "keyPressed"]
    );
    marker.registerCallbacks(
      [drawHighlight, drawUser],
      ["replaceTransient", "replaceTransient"]
    );

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
      this.onDoubleClick();
    });

    graphicContainer.addEventListener("mousedown", (event) => {
      this.onMouseDown();
    });

    drawBase();
  };
}
