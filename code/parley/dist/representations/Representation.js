export class Representation {
    wrangler;
    scales;
    get x() {
        return this.scales.x.dataToPlot(this.wrangler.x);
    }
    get y() {
        return this.scales.y.dataToPlot(this.wrangler.y);
    }
    registerWrangler = (wrangler) => {
        this.wrangler = wrangler;
    };
    registerScales = (scales) => {
        this.scales = scales;
    };
}
