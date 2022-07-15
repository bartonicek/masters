import * as funs from "../functions.js";
export class Representation {
    wrangler;
    handler;
    plotDims;
    scales;
    alpha;
    col;
    stroke;
    radius;
    sizeMultiplier;
    alphaMultiplier;
    constructor(wrangler, handler) {
        this.wrangler = wrangler;
        this.handler = handler;
    }
    getMapping = (mapping, type) => {
        let res = this.wrangler[mapping]?.extract2(type);
        res = this.scales[mapping]?.dataToPlot(res);
        return res;
    };
    get boundingRects() {
        return [];
    }
    drawBase = (context) => { };
    drawHighlight = (context, selectedPoints) => { };
    registerScales = (scales) => {
        this.scales = scales;
        return this;
    };
    defaultize = () => {
        this.alphaMultiplier = 1;
        this.sizeMultiplier = 1;
    };
    incrementSizeMultiplier = () => { };
    // Checks which bounding rects overlap with a rectangular selection region
    //E.g. [[0, 0], [Width, Height]] should include all bound. rects.
    inSelection = (selectionRect) => {
        const selected = this.boundingRects.map((rect) => funs.rectOverlap(rect, selectionRect));
        return this.wrangler.indices.map((index) => selected[index]);
    };
    inSelection2 = (selectionRect) => {
        const selectedReps = this.boundingRects.map((rect) => funs.rectOverlap(rect, selectionRect));
        const selectedDatapoints = this.wrangler.indices.flatMap((e, i) => selectedReps[e] ? i : []);
        return selectedDatapoints;
    };
    // Handle generic keypress actions
    onKeypress = (key) => {
        if (key === "KeyR")
            this.defaultize();
        if (key === "Minus" && this.sizeMultiplier)
            this.sizeMultiplier *= 0.8;
        if (key === "Equal" && this.sizeMultiplier)
            this.sizeMultiplier *= 1.2;
        if (key === "BracketLeft" && this.alphaMultiplier) {
            this.alphaMultiplier =
                0.8 * this.alphaMultiplier < 0.01
                    ? 0.01
                    : (this.alphaMultiplier *= 0.8);
        }
        if (key === "BracketRight" && this.alphaMultiplier)
            this.alphaMultiplier =
                1.2 * this.alphaMultiplier > 1 ? 1 : (this.alphaMultiplier *= 1.2);
    };
}
