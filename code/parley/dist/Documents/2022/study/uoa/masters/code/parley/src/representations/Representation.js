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
    constructor(wrangler, handler, plotDims) {
        this.wrangler = wrangler;
        this.handler = handler;
        this.plotDims = plotDims;
    }
    getMapping = (mapping, type) => {
        let res = this.wrangler[mapping]?.extract(type);
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
    inSelection = (selectionPoints) => { };
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
