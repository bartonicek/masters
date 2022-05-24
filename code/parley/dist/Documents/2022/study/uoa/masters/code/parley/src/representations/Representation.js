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
        return this.scales[mapping]?.dataToPlot(this.wrangler[mapping]?.extract(type));
    };
    dropMissing = (...vectors) => {
        let missingIndices = [...vectors].flatMap((vector) => vector
            .flatMap((value, index) => (value === null ? index : []))
            .sort((a, b) => a - b));
        missingIndices = Array.from(new Set(missingIndices));
        return [...vectors].map((vector) => vector.flatMap((value, index) => missingIndices.indexOf(index) === -1 ? value : []));
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
