export class AxisBox {
  sides: { bottom: boolean; left: boolean; top: boolean; right: boolean };
  scales: any;

  constructor(sides = { bottom: true, left: true, top: false, right: false }) {
    this.sides = sides;
  }

  registerScales(scales: any) {
    this.scales = scales;
  }

  draw(layer) {
    const [x0, x1] = [0, 1].map((e) => this.scales.x.pctToPlot(e));
    const [y0, y1] = [0, 1].map((e) => this.scales.y.pctToPlot(e));

    if (this.sides.bottom) layer.drawLine([x0, x1], [y0, y0]);
    if (this.sides.left) layer.drawLine([x0, x0], [y0, y1]);
    if (this.sides.top) layer.drawLine([x0, x1], [y1, y1]);
    if (this.sides.right) layer.drawLine([x1, x1], [y1, y0]);
  }

  drawBase(layer) {
    this.draw(layer);
  }
}
