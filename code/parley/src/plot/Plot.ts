import { DataFrame } from "../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";
import { Points } from "../geoms/Points.js";
import { XYScaleContinuous } from "../scales/xyscalecontinuous.js";

export class Plot extends GraphicStack {
  stats: { [key: string]: object };
  scales: { [key: string]: object };
  geoms: {
    [key: string]: {
      statX: (number | string | boolean)[];
      statY: (number | string | boolean)[];
      registerScales: Function;
    };
  };

  constructor(
    public data: DataFrame,
    public mapping: Map<string, string>,
    //objects: string[],
    public marker: object
  ) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.geoms = { points1: new Points(this.data, this.mapping) };
    this.scales = {
      x: new XYScaleContinuous(this.uniqueStatX, this.width),
      y: new XYScaleContinuous(this.uniqueStatY, this.height),
    };
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
