import { Representation } from "./Representation.js";
import * as dtstr from "../datastructures.js";
export class Squares extends Representation {
    constructor(wrangler) {
        super(wrangler);
    }
    getMappings = (membership = 1) => {
        const mappings = ["x", "y", "size"];
        let [x, y, size] = mappings.map((e) => this.getMapping(e, membership));
        const radius = this.getPars(membership).radius;
        size = size
            ? size.map((e) => radius * e * this.sizeMultiplier)
            : Array.from(Array(x.length), (e) => radius).map((e) => e * this.sizeMultiplier);
        return [x, y, size];
    };
    drawBase = (context) => {
        const [x, y, size] = this.getMappings(1);
        const { col, strokeCol, strokeWidth } = this.pars[0];
        const pars = { col, strokeCol, strokeWidth, alpha: this.alphaMultiplier };
        context.drawRectsHW(x, y, size, size, pars);
    };
    drawHighlight = (context) => {
        dtstr.validMembershipArray.forEach((e) => {
            const [x, y, size] = this.getMappings(e);
            if (!x)
                return;
            const { col, strokeCol, strokeWidth } = this.getPars(e);
            const pars = { col, strokeCol, strokeWidth, alpha: 1 };
            context.drawRectsHW(x, y, size, size, pars);
        });
    };
    get boundingRects() {
        const [x, y, size] = this.getMappings();
        return x.map((xi, i) => [
            [xi - size[i] / 2, y[i] - size[i] / 2],
            [xi + size[i] / 2, y[i] + size[i] / 2],
        ]);
    }
}
