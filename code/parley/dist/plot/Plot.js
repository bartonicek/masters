import { GraphicStack } from "./GraphicStack.js";
export class Plot extends GraphicStack {
    marker;
    scales;
    representations;
    auxiliaries;
    wranglers;
    handlers;
    constructor(marker) {
        super();
        this.marker = marker;
        this.marker = marker;
        this.representations = {};
        this.auxiliaries = {};
        this.wranglers = {};
        this.scales = {};
        this.handlers = {};
    }
    extractChildren = (object, what) => {
        return Object.keys(object).map((e) => object?.[e]?.[what]);
    };
    callChildren = (object, fun, ...args) => {
        Object.keys(object).forEach((e) => {
            object[e][fun] ? object[e][fun](...args) : null;
        });
    };
    getValues = (variable) => {
        const values = [].concat(...this.extractChildren(this.wranglers, variable));
        return Array.from(new Set(values));
    };
    drawBase = () => {
        this.callChildren(this.representations, "drawBase", this.graphicBase);
        this.callChildren(this.auxiliaries, "drawBase", this.graphicBase);
    };
    drawUser = () => {
        this.callChildren(this.representations, "drawUser", this.graphicUser);
        this.callChildren(this.auxiliaries, "drawUser", this.graphicUser);
    };
    initialize = () => {
        Object.keys(this.scales).forEach((mapping) => this.scales[mapping]?.registerData(this.getValues(mapping)));
        this.callChildren(this.representations, "registerScales", this.scales);
        this.callChildren(this.auxiliaries, "registerScales", this.scales);
        this.drawBase();
        const actions = ["mousedown", "mousemove", "mouseup"];
        const handlers = ["draghandler1", "draghandler1", "draghandler1"];
        const consequences = ["startDrag", "whileDrag", "endDrag"];
        actions.forEach((action, index) => {
            this.graphicContainer.addEventListener(action, (event) => {
                this.handlers[handlers[index]][consequences[index]](event);
            });
        });
    };
}
