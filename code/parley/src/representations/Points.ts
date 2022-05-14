import { Handler } from "../handlers/Handler.js";
import { Wrangler } from "../wrangler/Wrangler.js";
import { Representation } from "./Representation.js";
import * as funs from "../functions.js";

export class Points extends Representation {
  constructor(wrangler: Wrangler, handler: Handler) {
    super(wrangler, handler);
    this.col = "steelblue";
    this.stroke = null;
    this.radius = 5;
  }

  drawBase = (context: any) => {
    context.drawPoints(this.x, this.y, this.col, this.stroke, this.radius);
  };

  drawHighlight = (context: any, selected: number[]) => {
    const x = this.x.filter((e, i) => selected.indexOf(i) !== -1);
    const y = this.y.filter((e, i) => selected.indexOf(i) !== -1);
    context.drawClear();
    context.drawPoints(x, y, "firebrick", this.stroke, this.radius);
  };

  get boundingRects() {
    return this.x.map((e, i) => [
      e - this.radius,
      e + this.radius,
      this.y[i] - this.radius,
      this.y[i] + this.radius,
    ]);
  }

  inSelection = (selectionPoints) => {
    const combns = [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ];

    return this.boundingRects
      .map((points) => {
        return combns
          .map((indices) => indices.map((index) => points[index]))
          .some((point: [number, number]) =>
            funs.pointInRect(point, selectionPoints)
          );
      })
      .flatMap((bool, index) => (bool ? index : []));
  };
}
