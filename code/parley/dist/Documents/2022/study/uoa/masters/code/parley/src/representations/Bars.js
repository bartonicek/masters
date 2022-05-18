import { Representation } from "./Representation.js";
export class Bars extends Representation {
    constructor(wrangler, handler) {
        super(wrangler, handler);
    }
    drawBase = (context) => {
        context.drawBarsV(this.x, this.y, this.scales.y.plotMin, this.col, this.stroke);
    };
    drawHighlight = (context, selected) => {
        const currSelected = this.wrangler.indices.map((indexList) => {
            return selected.filter((point) => indexList.includes(point));
        });
        const lens = currSelected
            .map((e) => e.length)
            .map((e) => this.scales.y.dataToPlot(e));
        context.drawClear();
        context.drawBarsV(this.x, lens, this.scales.y.plotMin, "firebrick", this.stroke);
    };
}
