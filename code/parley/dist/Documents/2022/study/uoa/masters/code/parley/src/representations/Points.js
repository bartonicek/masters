import * as funs from "../functions.js";
import { Representation } from "./Representation.js";
export class Points extends Representation {
    constructor(wrangler) {
        super(wrangler);
    }
    getMappings = (membership = 0) => {
        const mappings = ["x", "y", "size"];
        let [x, y, size] = mappings.map((e) => this.getMapping(e, membership));
        const radius = this.pars.radius[membership];
        size = size
            ? size.map((e) => radius * e * this.sizeMultiplier)
            : Array.from(Array(x.length), (e) => radius).map((e) => e * this.sizeMultiplier);
        return [x, y, size];
    };
    drawBase = (context) => {
        const [x, y, size] = this.getMappings();
        const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 0);
        const pars = {
            col,
            radius: size,
            strokeCol,
            strokeWidth,
            alpha: this.alphaMultiplier,
        };
        context.drawClear();
        context.drawBackground();
        context.drawPoints(x, y, pars);
    };
    drawHighlight = (context) => {
        const [x, y, size] = this.getMappings(1);
        const { col, strokeCol, strokeWidth } = funs.accessIndexed(this.pars, 1);
        const pars = {
            col,
            radius: size,
            strokeCol,
            strokeWidth,
            alpha: 1,
        };
        context.drawClear();
        x ? context.drawPoints(x, y, pars) : null;
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
