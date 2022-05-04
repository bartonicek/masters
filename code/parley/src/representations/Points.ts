import { Representation } from "./Representation.js";

export class Points extends Representation {
  col: string;
  radius: number;

  constructor(col?: string, radius?: number) {
    super();
    this.col = col;
    this.radius = radius;
  }

  draw = (context: any) => {
    context.drawPoints(this.x, this.y, this.col, this.radius);
  };

  drawBase = (context: any) => {
    this.draw(context);
  };
}
