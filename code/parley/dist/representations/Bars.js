import { Representation } from "./Representation.js";
export class Bars extends Representation {
    constructor(wrangler) {
        super(wrangler);
    }
    draw = (context) => {
        context.drawBarsV(this.x, this.y, this.scales.y.plotMin, this.col, this.stroke);
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
