import { Scale } from "../scales/Scale.js";
import { Wrangler } from "../wrangler/Wrangler.js";

export class Representation {
  wrangler: Wrangler;
  scales: { [key: string]: any };

  get x() {
    return this.scales.x.dataToPlot(this.wrangler.x);
  }

  get y() {
    return this.scales.y.dataToPlot(this.wrangler.y);
  }

  registerWrangler = (wrangler: any) => {
    this.wrangler = wrangler;
  };

  registerScales = (scales: any) => {
    this.scales = scales;
  };
}
