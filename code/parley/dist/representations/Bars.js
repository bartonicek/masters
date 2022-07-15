import { Representation } from "./Representation.js";
import { globalParameters as gpars } from "../globalparameters.js";
export class Bars extends Representation {
    widthMultiplier;
    constructor(wrangler, handler, widthMultiplier) {
        super(wrangler, handler);
        this.sizeMultiplier = 1;
        this.alphaMultiplier = 1;
        this.widthMultiplier = widthMultiplier * this.sizeMultiplier;
    }
    get y0() {
        return this.scales.y.plotMin;
    }
    get width() {
        return (this.widthMultiplier *
            this.sizeMultiplier *
            (this.getMapping("x").sort()[1] - this.getMapping("x").sort()[0]));
    }
    getMappings = (membership) => {
        return ["x", "y"].map((mapping) => this.getMapping(mapping, membership));
    };
    drawBase = (context) => {
        const [x, y] = this.getMappings();
        const { y0, width, alphaMultiplier } = this;
        const { col, strokeCol } = gpars.reps.base;
        context.drawClear();
        context.drawBackground();
        context.drawBarsV(x, y, y0, col, alphaMultiplier, strokeCol, width);
    };
    drawHighlight = (context) => {
        const [x, y] = this.getMappings(1);
        const { y0, width, alphaMultiplier } = this;
        const { col, strokeCol } = gpars.reps.highlight;
        context.drawClear();
        x ? context.drawBarsV(x, y, y0, col, 1, strokeCol, width) : null;
    };
    get boundingRects() {
        const [x, y] = this.getMappings();
        const [wh, y0] = [this.width / 2, this.scales.y.plotMin];
        return x.map((xi, i) => [
            [xi - wh, y0],
            [xi + wh, y[i]],
        ]);
    }
}
