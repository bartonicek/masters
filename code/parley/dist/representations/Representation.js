export class Representation {
    wrangler;
    handler;
    plotDims;
    scales;
    alpha;
    col;
    stroke;
    radius;
    constructor(wrangler, handler, plotDims) {
        this.wrangler = wrangler;
        this.handler = handler;
        this.plotDims = plotDims;
    }
    getMapping = (mapping, type) => {
        return this.scales[mapping].dataToPlot(this.wrangler[mapping].extract(type));
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
    inSelection = (selectionPoints) => { };
}
