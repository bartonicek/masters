import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
import { globalParameters as gpars } from "../globalparameters.js";
export class Bars extends Representation {
    width;
    constructor(wrangler, handler, plotDims) {
        super(wrangler, handler, plotDims);
        this.width =
            plotDims.width / (3 * funs.unique(wrangler.x.extract()).length);
        this.alphaMultiplier = 1;
    }
    get y0() {
        return this.scales.y.plotMin;
    }
    getMappings = (type) => {
        return ["x", "y"].map((mapping) => this.getMapping(mapping, type));
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
        const [x, y] = this.getMappings("selected");
        const { y0, width, alphaMultiplier } = this;
        const { col, strokeCol } = gpars.reps.highlight;
        context.drawClear();
        x
            ? context.drawBarsV(x, y, y0, col, alphaMultiplier, strokeCol, width)
            : null;
    };
    get boundingRects() {
        const [x, y] = this.getMappings();
        const [wh, y0] = [this.width / 2, this.scales.y.plotMin];
        return x.map((xi, i) => [
            [xi - wh, y0],
            [xi + wh, y0],
            [xi - wh, y[i]],
            [xi + wh, y[i]],
        ]);
    }
    inSelection = (selectionPoints) => {
        const selected = this.boundingRects.map((points) => points.some((point) => funs.pointInRect(point, selectionPoints)));
        return this.wrangler.indices.map((index) => selected[index]);
    };
}
