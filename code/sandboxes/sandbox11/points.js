import { PointsPrimitive } from "./primitives/pointsprim.js";

export class Points {
  constructor(data, mapping, scales) {
    this.dataX = data[mapping.get("x")];
    this.dataY = data[mapping.get("y")];
    this.n = this.dataX.length;
    this.scales = scales;
    this.radius = 5;
  }

  get plotX() {
    return this.scales.x.dataToPlot(this.dataX);
  }

  get plotY() {
    return this.scales.y.dataToPlot(this.dataY);
  }

  get boundingRects() {
    return {
      x0: this.plotX.map((e) => e - this.radius),
      x1: this.plotX.map((e) => e + this.radius),
      y0: this.plotY.map((e) => e - this.radius),
      y1: this.plotY.map((e) => e + this.radius),
    };
  }

  drawBase(context) {
    const x = this.plotX;
    const y = this.plotY;
    PointsPrimitive.draw(context, x, y, "steelblue");
  }

  drawHighlight(context, selected) {
    const x = this.plotX.filter((e, i) => selected[i]);
    const y = this.plotY.filter((e, i) => selected[i]);
    PointsPrimitive.draw(context, x, y, "firebrick", 5, true);
  }

  pointIn(x, y, a0, a1, b0, b1) {
    return (x - a0) * (x - a1) < 0 && (y - b0) * (y - b1) < 0;
  }

  inSelection = (points) => {
    const { a0, a1, b0, b1 } = points;
    const { x0, y0, x1, y1 } = this.boundingRects;
    let arr = new Uint32Array(Array(this.n)).map((e, i) => i);

    const pointInAB = (x, y) => this.pointIn(x, y, a0, a1, b0, b1);

    arr = arr.filter((e) => {
      return (
        pointInAB(x0[e], y0[e]) ||
        pointInAB(x1[e], y0[e]) ||
        pointInAB(x0[e], y1[e]) ||
        pointInAB(x1[e], y1[e])
      );
    });

    return arr;
  };
}
