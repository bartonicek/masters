import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";

export class Bars extends Representation {
  constructor(wrangler: Wrangler) {
    super(wrangler);
  }

  draw = (context: any) => {
    context.drawBarsV(
      this.x,
      this.y,
      this.scales.y.plotMin,
      this.col,
      this.stroke
    );
  };

  drawBase = (context: any) => {
    this.draw(context);
  };
}
