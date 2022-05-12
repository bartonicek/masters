//import { Scale } from "../scales/Scale.js";

export class Auxiliary {
  scales: { [key: string]: any };
  handler: any;

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  registerHandler = (handler: any) => {
    this.handler = handler;
  };

  drawUser = (context: any, handler: any) => {};
}
