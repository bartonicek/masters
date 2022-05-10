import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
import * as reps from "../representations/representations.js";
import * as scales from "../scales/scales.js";
import { Wrangler } from "../wrangler/Wrangler.js";
export class Plot extends GraphicStack {
    data;
    mapping;
    marker;
    scales;
    representations;
    wranglers;
    constructor(data, mapping, marker) {
        super();
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.representations = {
            bars1: new reps.Bars("orange"),
            points1: new reps.Points(),
            axisbox1: new reps.AxisBox(),
        };
        this.scales = {
            x: new scales.XYScaleDiscrete(this.width),
            y: new scales.XYScaleContinuous(this.height, -1),
        };
        this.wranglers = {
            identity1: new Wrangler(this.data, this.mapping).extractIdentical("x", "y"),
            summary1: new Wrangler(this.data, this.mapping)
                .splitBy("x")
                .splitWhat("y")
                .doWithin(funs.mean),
        };
        this.initialize();
    }
    extractChildren = (object, what) => {
        return Object.keys(object).map((e) => object?.[e]?.[what]);
    };
    callChildren = (object, fun, ...args) => {
        Object.keys(object).forEach((e) => object?.[e]?.[fun](...args));
    };
    getValues = (variable) => {
        const values = [].concat(...this.extractChildren(this.wranglers, variable));
        return Array.from(new Set(values));
    };
    drawBase = () => {
        this.callChildren(this.representations, "drawBase", this.graphicBase);
    };
    initialize = () => {
        this.representations.points1.registerWrangler(this.wranglers.identity1);
        this.representations.bars1.registerWrangler(this.wranglers.summary1);
        ["x", "y"].forEach((mapping) => this.scales[mapping].registerData(this.getValues(mapping)));
        this.callChildren(this.representations, "registerScales", this.scales);
        this.drawBase();
    };
}
