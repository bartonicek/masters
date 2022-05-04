export class Representation {
    stat;
    scales;
    get x() {
        return this.scales.x.dataToPlot(this.stat.x);
    }
    get y() {
        return this.scales.y.dataToPlot(this.stat.y);
    }
    registerStat = (stat) => {
        this.stat = stat;
    };
    registerScales = (scales) => {
        this.scales = scales;
    };
}
