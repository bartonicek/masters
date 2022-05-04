import { GraphicStack } from "./GraphicStack.js";
import * as reps from "../representations/representations.js";
import * as scales from "../scales/scales.js";
export class Plot extends GraphicStack {
  data;
  mapping;
  marker;
  scales;
  entities;
  constructor(data, mapping, marker) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;
    this.entities = { points1: new reps.Points() };
    this.scales = {
      x: new scales.XYScaleContinuous(this.width),
      y: new scales.XYScaleContinuous(this.height),
    };
    this.initialize();
  }
  iterateObject = (object, fun, ...args) => {
    Object.keys(object).forEach((e) => object[e][fun](...args));
  };
  initialize = () => {
    this.iterateObject(this.entities, "registerScales", this.scales);
  };
}
