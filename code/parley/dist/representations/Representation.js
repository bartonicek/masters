export class Representation {
    wrangler;
    scales;
    get x() {
        return this.scales.x.dataToPlot(this.wrangler.x);
    }
    get y() {
        return this.scales.y.dataToPlot(this.wrangler.y);
    }
    registerWrangler = (stat) => {
        this.wrangler = stat;
    };
    registerScales = (scales) => {
        this.scales = scales;
    };
}
