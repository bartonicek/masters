import { Representation } from "./Representation.js";
import * as funs from "../functions.js";
export class Points extends Representation {
    constructor(wrangler, handler, plotDims) {
        super(wrangler, handler, plotDims);
        this.col = "steelblue";
        this.stroke = null;
        this.radius = 5;
    }
    getMappings = (type) => {
        let [x, y, size] = ["x", "y", "size"].map((mapping) => this.getMapping(mapping, type));
        size = size
            ? size.map((e) => Math.sqrt(e))
            : Array.from(Array(x.length), (e) => 5);
        [x, y, size] = this.dropMissing(x, y, size);
        return [x, y, size];
    };
    drawBase = (context) => {
        const [x, y, size] = this.getMappings();
        context.drawPoints(x, y, this.col, this.stroke, size);
    };
    drawHighlight = (context, selected) => {
        const [x, y, size] = this.getMappings("selected");
        context.drawClear();
        context.drawPoints(x, y, "firebrick", this.stroke, size);
    };
    get boundingRects() {
        const [x, y, size] = this.getMappings();
        return x.map((e, i) => [
            e - size[i],
            e + size[i],
            y[i] - size[i],
            y[i] + size[i],
        ]);
    }
    inSelection = (selectionPoints) => {
        const combns = [
            [0, 2],
            [0, 3],
            [1, 2],
            [1, 3],
        ];
        const sel = this.boundingRects.map((points) => {
            return combns
                .map((indices) => indices.map((index) => points[index]))
                .some((point) => funs.pointInRect(point, selectionPoints));
        });
        return this.wrangler.indices.map((e) => sel[e]);
    };
}
