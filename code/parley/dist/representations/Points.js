import { Representation } from "./Representation.js";
export class Points extends Representation {
    col;
    radius;
    constructor(col, radius) {
        super();
        this.col = col;
        this.radius = radius;
    }
    draw = (context) => {
        context.drawPoints(this.x, this.y, this.col, this.radius);
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
