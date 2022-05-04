import { DataFrame } from "../datastructures.js";
import { GraphicStack } from "./GraphicStack.js";
import { Points } from "../bodies/Points.js";
import { XYScaleContinuous } from "../scales/xyscalecontinuous.js";
import { Bars } from "../bodies/Bars.js";
import { AxisBox } from "../bodies/AxisBox.js";

export class Plot extends GraphicStack {
  scales: { [key: string]: object };
  bodies: { [key: string]: any };

  constructor(
    public data: DataFrame,
    public mapping: Map<string, string>,
    public marker: object
  ) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.bodies = {
      bars1: new Bars(this.data, this.mapping),
      points1: new Points(this.data, this.mapping),
      axisbox1: new AxisBox(),
    };

    this.scales = {
      x: new XYScaleContinuous(this.uniqueX, this.width),
      y: new XYScaleContinuous(this.uniqueY, this.height, -1),
    };

    this.initialize();
  }

  get uniqueX(): any[] {
    let set = new Set();
    Object.keys(this.bodies).forEach((body) => {
      set = new Set([...set, ...new Set(this.bodies[body]?.stat?.x)]);
    });
    return Array.from(set);
  }

  get uniqueY(): any[] {
    let set = new Set();
    Object.keys(this.bodies).forEach((body) => {
      set = new Set([...set, ...new Set(this.bodies[body]?.stat?.y)]);
    });
    return Array.from(set);
  }

  drawBase() {
    Object.keys(this.bodies).forEach((e) => {
      this.bodies[e].drawBase(this.graphicBase);
    });
  }

  initialize = () => {
    this.bodies.bars1.registerStat("summary", ["mean"]);
    Object.keys(this.bodies).forEach((e) => {
      this.bodies[e].registerScales(this.scales);
    });
    this.drawBase();
  };
}
