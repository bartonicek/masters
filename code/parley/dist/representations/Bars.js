import { Representation } from "./Representation.js";
export class Bars extends Representation {
    col;
    stroke;
    constructor(col = "steelblue", stroke = null) {
        super();
        this.col = col;
        this.stroke = stroke;
    }
    draw = (context) => {
        context.drawBarsV(this.x, this.y, this.scales.y.plotMin, this.col, this.stroke);
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
