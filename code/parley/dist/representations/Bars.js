import { Representation } from "./Representation.js";
export class Bars extends Representation {
    draw = (context) => {
        context.drawBarsV(this.x, this.y, this.scales.y.plotMin, "firebrick");
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
