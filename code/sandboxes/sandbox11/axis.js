import { LinePrimitive } from "./primitives/lineprim.js";
import { TextPrimitive } from "./primitives/textprim.js";

export class Axis {
  constructor(scales) {
    this.scales = scales;
    this.xText = new AxisText(scales.x);
    this.yText = new AxisText(scales.y);
  }

  draw(context) {
    const { plotMin: x0, plotMax: x1 } = this.scales.x;
    const { plotMin: y0, plotMax: y1 } = this.scales.y;

    LinePrimitive.draw(context, [x0, x1], [y0, y0]);
    LinePrimitive.draw(context, [x0, x0], [y0, y1]);

    this.xText.plotBreaks.forEach((e, i) =>
      context.fillText(this.xText.dataLabels[i], e, y0 + 20)
    );

    this.yText.plotBreaks.forEach((e, i) => {
      context.fillText(this.yText.dataLabels[i], x0 - 30, e);
    });
    context.restore();
  }

  drawBase(base) {
    this.draw(base);
  }
}

class AxisText {
  constructor(scale, breaks = 5) {
    this.scale = scale;
    this.breaks = breaks;
  }

  get pctBreaks() {
    return this.breaks.length > 1
      ? this.breaks
      : Array.from(Array(this.breaks), (e, i) => i / (this.breaks - 1));
  }

  get dataBreaks() {
    return this.scale.values
      ? this.scale.values
      : this.pctBreaks.map((e) => this.scale.pctToData(e));
  }

  get dataLabels() {
    return this.scale.values
      ? this.scale.values
      : this.dataBreaks.map((e) => e.toPrecision(3));
  }

  get plotBreaks() {
    return this.dataBreaks.map((e) => this.scale.dataToPlot(e));
  }
}
