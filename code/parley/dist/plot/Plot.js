import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
export class Plot extends GraphicStack {
    marker;
    active;
    scales;
    representations;
    auxiliaries;
    wranglers;
    handlers;
    constructor(marker) {
        super();
        this.active = false;
        this.marker = marker;
        this.representations = {};
        this.auxiliaries = {};
        this.wranglers = {};
        this.scales = {};
        this.handlers = {};
    }
    // Extract a property from each child
    extractChildren = (object, what) => {
        return Object.keys(object).map((e) => object?.[e]?.[what]);
    };
    // Call each child w/o returning anything
    callChildren = (object, fun, ...args) => {
        Object.keys(object).forEach((child) => {
            object[child][fun] ? object[child][fun](...args) : null;
        });
    };
    // Return something for each child
    mapChildren = (object, fun, ...args) => {
        return Object.keys(object).map((child) => {
            return object[child][fun] ? object[child][fun](...args) : null;
        });
    };
    getValues = (variable) => {
        const values = [].concat(...this.extractChildren(this.wranglers, variable));
        return Array.from(new Set(values));
    };
    draw = (context, ...args) => {
        const what = "draw" + funs.capitalize(context);
        const where = "graphic" + funs.capitalize(context);
        this.callChildren(this.representations, what, this[where], ...args);
        this.callChildren(this.auxiliaries, what, this[where], ...args);
    };
    drawBase = () => this.draw("base");
    drawHighlight = () => this.draw("highlight", this.marker.selected);
    drawUser = () => this.draw("user");
    inSelection = (selectionPoints) => {
        const allPoints = [].concat(...this.mapChildren(this.representations, "inSelection", selectionPoints));
        return Array.from(new Set(allPoints));
    };
    updateMarker = (dataPoints) => {
        this.marker.hardReceive(dataPoints);
    };
    onSelection = (handler) => {
        this.updateMarker(this.inSelection(handler.selectionPoints));
    };
    initialize = () => {
        Object.keys(this.scales).forEach((mapping) => this.scales[mapping]?.registerData(this.getValues(mapping)));
        this.callChildren(this.representations, "registerScales", this.scales);
        this.callChildren(this.auxiliaries, "registerScales", this.scales);
        this.drawBase();
        ["onSelection", "drawHighlight"].forEach((e) => this.handlers.draghandler1.registerCallback(this[e]));
        Object.keys(this.handlers).forEach((handlerName) => {
            const handler = this.handlers[handlerName];
            handler.actions.forEach((action, index) => {
                this.graphicContainer.addEventListener(action, (event) => {
                    handler[handler.consequences[index]](event);
                });
            });
        });
        document.body.addEventListener("dblclick", (event) => {
            this.graphicHighlight.drawClear();
            this.graphicUser.drawClear();
            this.active = false;
        });
        document.body.addEventListener("mousedown", (event) => {
            this.active = document
                .getElementById(this.id)
                .contains(event.target)
                ? true
                : false;
        });
    };
}
