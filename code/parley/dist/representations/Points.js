import * as dtstr from "../datastructures.js";
import { Representation } from "./Representation.js";
export class Points extends Representation {
    constructor(wrangler) {
        super(wrangler);
    }
    getMappings = (membership = 0) => {
        const mappings = ["x", "y", "size"];
        let [x, y, size] = mappings.map((e) => this.getMapping(e, membership));
        const radius = this.pars[membership].radius;
        size =
            size.length > 0
                ? size.map((e) => radius * e * this.sizeMultiplier)
                : Array.from(Array(x.length), (e) => radius).map((e) => e * this.sizeMultiplier);
        return [x, y, size];
    };
    drawBase = (context) => {
        const [x, y, size] = this.getMappings(0);
        const { col, strokeCol, strokeWidth } = this.pars[0];
        const pars = {
            col,
            radius: size,
            strokeCol,
            strokeWidth,
            alpha: this.alphaMultiplier,
        };
        context.drawPoints(x, y, pars);
    };
    drawHighlight = (context) => {
        dtstr.highlightMembershipArray.forEach((e) => {
            const [x, y, size] = this.getMappings(e);
            if (!(x.length > 0))
                return;
            const { col, strokeCol, strokeWidth } = this.pars[e];
            const pars = {
                col,
                radius: size,
                strokeCol,
                strokeWidth,
                alpha: 1,
            };
            context.drawPoints(x, y, pars);
        });
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
