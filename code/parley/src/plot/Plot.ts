import * as datastr from "./../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
import * as reps from "../representations/representations.js";
import * as scales from "../scales/scales.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { RectDragHandler } from "../handlers/RectDragHandler.js";
import * as auxs from "../auxiliaries/auxiliaries.js";

export class Plot extends GraphicStack {
  scales: { [key: string]: scales.Scale };
  representations: { [key: string]: reps.Representation };
  auxiliaries: { [key: string]: auxs.Auxiliary };
  wranglers: { [key: string]: Wrangler };
  handlers: { [key: string]: RectDragHandler };

  constructor(public marker: object) {
    super();
    this.marker = marker;

    this.representations = {};
    this.auxiliaries = {};
    this.wranglers = {};
    this.scales = {};
    this.handlers = {};
  }

  extractChildren = (object: object, what: string) => {
    return Object.keys(object).map((e) => object?.[e]?.[what]);
  };

  callChildren = (object: object, fun: string, ...args: any) => {
    Object.keys(object).forEach((e) => {
      object[e][fun] ? object[e][fun](...args) : null;
    });
  };

  getValues = (variable: string) => {
    const values = [].concat(...this.extractChildren(this.wranglers, variable));
    return Array.from(new Set(values));
  };

  drawBase = () => {
    this.callChildren(this.representations, "drawBase", this.graphicBase);
    this.callChildren(this.auxiliaries, "drawBase", this.graphicBase);
  };

  drawUser = () => {
    this.callChildren(this.representations, "drawUser", this.graphicUser);
    this.callChildren(this.auxiliaries, "drawUser", this.graphicUser);
  };

  initialize = () => {
    Object.keys(this.scales).forEach((mapping) =>
      this.scales[mapping]?.registerData(this.getValues(mapping))
    );

    this.callChildren(this.representations, "registerScales", this.scales);
    this.callChildren(this.auxiliaries, "registerScales", this.scales);

    this.drawBase();

    const actions = ["mousedown", "mousemove", "mouseup"];
    const handlers = ["draghandler1", "draghandler1", "draghandler1"];
    const consequences = ["startDrag", "whileDrag", "endDrag"];

    actions.forEach((action, index) => {
      this.graphicContainer.addEventListener(action, (event) => {
        this.handlers[handlers[index]][consequences[index]](event);
      });
    });
  };
}
