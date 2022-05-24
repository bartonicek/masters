//import { Scale } from "../scales/Scale.js";

export class Auxiliary {
  scales: { [key: string]: any };
  handler: any;

  registerScales = (scales: any) => {
    this.scales = scales;
    return this;
  };

  draw = (context: any) => {};
  drawBase = (context: any) => {};
  drawUser = (context: any, handler: any) => {};
}
