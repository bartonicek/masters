import * as stats from "../statistics.js";
export class Points {
    stat;
    scales;
    dataX;
    dataY;
    statX;
    statY;
    constructor(data, mapping, stat = {
        x: { name: "identity", args: ["identity"] },
        y: { name: "identity", args: ["identity"] },
    }) {
        this.dataX = data[mapping.get("x")];
        this.dataY = data[mapping.get("y")];
        this.statX = stats[stat.x.name](this.dataX, ...stat.x.args);
        this.statY = stats[stat.y.name](this.dataY, ...stat.y.args);
    }
    registerScales = (scales) => {
        this.scales = scales;
    };
    get plotX() {
        return this.scales.x.dataToPlot(this.statX);
    }
    get plotY() {
        return this.scales.y.dataToPlot(this.statY);
    }
    draw = (context) => {
        context.drawPoints(this.plotX, this.plotY);
    };
}
