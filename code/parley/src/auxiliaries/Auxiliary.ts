//import { Scale } from "../scales/Scale.js";

export class Auxiliary {
  scales: { [key: string]: any };
  handler: any;

  registerScales = (scales: any) => {
    this.scales = scales;
    return this;
  };

  drawUser = (context: any, handler: any) => {};
}
