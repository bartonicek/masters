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

  draw(x, y, col, context, transp) {
    context.save();
    context.fillStyle = col;

    if (transp === true) context.clearRect(0, 0, 400, 400);

    x.forEach((e, i) => {
      context.beginPath();
      context.arc(e, y[i], this.radius, 0, Math.PI * 2);
      context.fill();
    });

    context.restore();
  }

  drawBase(context) {
    const x = this.plotX;
    const y = this.plotY;

    this.draw(x, y, "steelblue", context);
  }

  drawHighlight(context, selected) {
    const x = this.plotX.filter((e, i) => selected[i]);
    const y = this.plotY.filter((e, i) => selected[i]);

    this.draw(x, y, "firebrick", context, true);
  }

  pointIn(x, y, a0, a1, b0, b1) {
    return (x - a0) * (x - a1) < 0 && (y - b0) * (y - b1) < 0;
  }

  inSelection = (points) => {
    const { a0, a1, b0, b1 } = points;
    const { x0, y0, x1, y1 } = this.boundingRects;
    let arr = Array.from(Array(this.n), (e, i) => i);

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
