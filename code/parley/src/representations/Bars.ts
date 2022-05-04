import { Representation } from "./Representation.js";

export class Bars extends Representation {
  draw = (context: any) => {
    context.drawBarsV(this.x, this.y, this.scales.y.plotMin, "firebrick");
  };

  drawBase = (context: any) => {
    this.draw(context);
  };
}
