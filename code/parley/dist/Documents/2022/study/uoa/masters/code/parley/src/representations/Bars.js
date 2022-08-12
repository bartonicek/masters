import * as funs from "../functions.js";
import { Representation } from "./Representation.js";
export class Bars extends Representation {
    widthMultiplier;
    constructor(wrangler, widthMultiplier) {
        super(wrangler);
        this.widthMultiplier = widthMultiplier;
        this.sizeMultiplier = widthMultiplier;
        this.sizeLimits = { min: 0.01, max: 1 };
        this.alphaMultiplier = 1;
    }
    get y0() {
        return this.scales.y.plotMin;
    }
    get width() {
        return (this.sizeMultiplier *
            (this.getMapping("x").sort()[1] - this.getMapping("x").sort()[0]));
    }
    defaultize = () => {
        this.sizeMultiplier = this.widthMultiplier;
        this.alphaMultiplier = 1;
    };
    getMappings = (type) => {
        const mappings = ["x", "y"];
        return mappings.map((e) => this.getMapping(e, type));
    };
    drawBase = (context) => {
        const [x, y] = this.getMappings();
        const { y0, width, alphaMultiplier } = this;
        const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 0);
        const pars = { col, strokeCol, strokeWidth, alpha: alphaMultiplier, width };
        context.drawClear();
        context.drawBackground();
        context.drawBarsV(x, y, y0, pars);
    };
    drawHighlight = (context) => {
        const [x, y] = this.getMappings(1);
        const { y0, width } = this;
        const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 1);
        const pars = { col, strokeCol, strokeWidth, alpha: 1, width };
        context.drawClear();
        x ? context.drawBarsV(x, y, y0, pars) : null;
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
