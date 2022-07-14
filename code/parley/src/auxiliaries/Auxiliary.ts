//import { Scale } from "../scales/Scale.js";

export class Auxiliary {
  scales: { [key: string]: any };
  handler: any;
  handlers: any;

  registerScales = (scales: any) => {
    this.scales = scales;
    return this;
  };

  draw = (context: any, ...args: any[]) => {};
  drawBase = (context: any, ...args: any[]) => {};
  drawUser = (context: any, handler: any, ...args: any[]) => {};
}
