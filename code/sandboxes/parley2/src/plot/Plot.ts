import { DataFrame } from "../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";

export class Plot extends GraphicStack {
  stats: { [key: string]: object };
  scales: { [key: string]: object };
  geoms: any;

  constructor(
    public data: DataFrame,
    public mapping: Map<string, string>,
    public marker: object
  ) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.scales = {};
    this.initialize();
  }

  get uniqueStatX(): any[] {
    let set = new Set();
    Object.keys(this.geoms).forEach((geom) => {
      set = new Set([...set, ...new Set(this.geoms[geom].statX)]);
    });
    return Array.from(set);
  }

  get uniqueStatY(): any[] {
    let set = new Set();
    Object.keys(this.geoms).forEach((geom) => {
      set = new Set([...set, ...new Set(this.geoms[geom].statX)]);
    });
    return Array.from(set);
  }

  initialize = () => {
    Object.keys(this.geoms).forEach((e) => {
      this.geoms[e].registerScales(this.scales);
    });
  };
}
