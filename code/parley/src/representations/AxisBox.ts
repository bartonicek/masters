import { Representation } from "./Representation.js";

export class AxisBox extends Representation {
  draw = (context: any) => {
    const x0 = this.scales.x.dataToPlot(this.scales.x.dataMin);
    const x1 = this.scales.x.dataToPlot(this.scales.x.dataMax);
    const y0 = this.scales.y.dataToPlot(this.scales.y.dataMin);
    const y1 = this.scales.y.dataToPlot(this.scales.y.dataMax);

    context.drawLine([x0, x1], [y0, y0]);
    context.drawLine([x0, x0], [y0, y1]);
  };

  drawBase = (context: any) => {
    this.draw(context);
  };
}
