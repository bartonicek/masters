import { Representation } from "./Representation.js";
import { globalParameters as gpars } from "../globalparameters.js";
export class Points extends Representation {
    constructor(wrangler) {
        super(wrangler);
    }
    getMappings = (type) => {
        let [x, y, size] = ["x", "y", "size"].map((mapping) => this.getMapping(mapping, type));
        const { radius } = type === 1 ? gpars.reps.highlight : gpars.reps.base;
        size = size
            ? size.map((e) => radius * e * this.sizeMultiplier)
            : Array.from(Array(x.length), (e) => radius).map((e) => e * this.sizeMultiplier);
        return [x, y, size];
    };
    drawBase = (context) => {
        const [x, y, size] = this.getMappings();
        const { col, strokeCol, strokeWidth } = gpars.reps.base;
        context.drawClear();
        context.drawBackground();
        context.drawPoints(x, y, col, strokeCol, size, this.alphaMultiplier);
    };
    drawHighlight = (context) => {
        const [x, y, size] = this.getMappings(1);
        const { col, strokeCol, strokeWidth } = gpars.reps.highlight;
        const { alphaMultiplier } = this;
        context.drawClear();
        x ? context.drawPoints(x, y, col, strokeCol, size, 1) : null;
    };
    get boundingRects() {
        const [x, y, size] = this.getMappings();
        const c = 1 / Math.sqrt(2);
        return x.map((xi, i) => [
            [xi - c * size[i], y[i] - c * size[i]],
            [xi + c * size[i], y[i] + c * size[i]],
        ]);
    }
}
