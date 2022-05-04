import { GraphicStack } from "./GraphicStack.js";
import * as reps from "../representations/representations.js";
import * as scales from "../scales/scales.js";
import * as stats from "../statistics/statistics.js";
export class Plot extends GraphicStack {
    data;
    mapping;
    marker;
    scales;
    representations;
    statistics;
    constructor(data, mapping, marker) {
        super();
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.representations = {
            points2: new reps.Bars(),
            points1: new reps.Points(),
            axisbox1: new reps.AxisBox(),
        };
        this.scales = {
            x: new scales.XYScaleContinuous(this.width),
            y: new scales.XYScaleContinuous(this.height, -1),
        };
        this.statistics = {
            identity1: new stats.Identity(this.data, this.mapping),
            summary1: new stats.Summary(this.data, this.mapping, ["mean"]),
        };
        this.initialize();
    }
    extractChildren = (object, what) => {
        return Object.keys(object).map((e) => object?.[e]?.[what]);
    };
    callChildren = (object, fun, ...args) => {
        Object.keys(object).forEach((e) => object?.[e]?.[fun](...args));
    };
    get xVals() {
        const values = [].concat(...this.extractChildren(this.statistics, "x"));
        return Array.from(new Set(values));
    }
    get yVals() {
        const values = [].concat(...this.extractChildren(this.statistics, "y"));
        return Array.from(new Set(values));
    }
    drawBase = () => {
        this.callChildren(this.representations, "drawBase", this.graphicBase);
    };
    initialize = () => {
        this.representations.points1.registerStat(this.statistics.identity1);
        this.representations.points2.registerStat(this.statistics.summary1);
        this.scales.x.registerData(this.xVals);
        this.scales.y.registerData(this.yVals);
        this.callChildren(this.representations, "registerScales", this.scales);
        this.drawBase();
    };
}
