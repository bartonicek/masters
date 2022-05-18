export class Representation {
    wrangler;
    handler;
    scales;
    alpha;
    col;
    stroke;
    radius;
    constructor(wrangler, handler) {
        this.wrangler = wrangler;
        this.handler = handler;
    }
    get x() {
        return this.scales.x.dataToPlot(this.wrangler.x);
    }
    get y() {
        return this.scales.y.dataToPlot(this.wrangler.y);
    }
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
