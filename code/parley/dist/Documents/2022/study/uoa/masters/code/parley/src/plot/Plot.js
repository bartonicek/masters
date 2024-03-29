import * as funs from "../functions.js";
import * as hndl from "../handlers/handlers.js";
import { GraphicStack } from "./GraphicStack.js";
export class Plot extends GraphicStack {
    id;
    scales;
    representations;
    auxiliaries;
    wranglers;
    handlers;
    constructor(id, handlers) {
        super();
        this.id = id;
        this.representations = {};
        this.auxiliaries = {};
        this.wranglers = {};
        this.scales = {};
        this.handlers = {
            marker: handlers.marker,
            keypress: handlers.keypress,
            state: handlers.state,
            drag: new hndl.RectDragHandler(this.graphicContainer),
            click: new hndl.ClickHandler(this.graphicContainer),
        };
    }
    get active() {
        return this.handlers.state.isActive(this.id);
    }
    activate = () => {
        this.handlers.state.deactivateAll();
        this.handlers.state.activate(this.id);
    };
    // Calls a method (string) on each child of a property (string)
    // e.g. call method "drawBase" on each child of "representations"
    callChildren = (object, fun, ...args) => {
        const obj = this[object];
        Object.keys(obj).forEach((child) => {
            obj[child][fun] ? obj[child][fun](...args) : null;
        });
    };
    // Returns a result of a function [string] from each child of a property [string]
    // e.g. return selected points from each representation
    mapChildren = (object, fun, ...args) => {
        const obj = this[object];
        return Object.keys(obj).map((child) => {
            return obj[child][fun] ? obj[child][fun](...args) : null;
        });
    };
    // Gets all unique values of a mapping [string], across all wranglers
    getUnique = (mapping) => {
        const { wranglers } = this;
        const arr = Object.keys(wranglers).flatMap((name) => wranglers[name][mapping].extract() ?? []);
        return Array.from(new Set(arr));
    };
    // Given an array of selection points, checks each representation
    inSelection = (selPoints) => {
        const { mapChildren } = this;
        const allPoints = mapChildren("representations", "inSelection", selPoints);
        return Array.from(new Set(allPoints.flat()));
    };
    atClick = (clickPoint) => {
        const { mapChildren } = this;
        const allPoints = mapChildren("representations", "atClick", clickPoint);
        return Array.from(new Set(allPoints.flat()));
    };
    startDrag = () => {
        if (this.handlers.state.inMode("or")) {
            this.handlers.marker.mergeTransient();
        }
    };
    whileDrag = () => {
        const { marker, drag, state } = this.handlers;
        if (!state.inMode("or"))
            marker.persistentMembership.clear();
        marker.replaceTransient(this.inSelection(drag.selectionCurrent), 1);
    };
    endDrag = () => {
        this.handlers.marker.mergeTransient();
    };
    onKeypress = () => {
        const { callChildren } = this;
        const { keypress, state } = this.handlers;
        callChildren("handlers", "onKeyPress", keypress.lastPressed);
        if (this.active) {
            callChildren("representations", "onKeypress", keypress.lastPressed);
        }
    };
    onKeyRelease = () => {
        const { handlers, callChildren } = this;
        callChildren("handlers", "onKeyRelease", handlers.keypress.lastPressed);
        if (this.active) {
            callChildren("representations", "onKeyRelease", handlers.keypress.lastPressed);
        }
    };
    onMouseDownAnywhere = () => {
        const { marker, drag, state } = this.handlers;
        if (!state.inMode("or")) {
            drag.clear();
            marker.clear();
            this.drawUser();
        }
    };
    onMouseDownHere = () => {
        const { marker, click, drag, state } = this.handlers;
        if (state.inMode("or"))
            marker.mergeTransient();
        if (!state.inMode("or")) {
            drag.clear();
            marker.clear();
        }
        state.deactivateAll();
        this.activate();
        marker.replaceTransient(this.atClick(click.clickLast), 1);
    };
    onDoubleClick = () => {
        const { marker, drag, state } = this.handlers;
        marker.clear();
        drag.clear();
        state.activateAll();
        this.drawHighlight();
        this.drawUser();
        state.deactivateAll();
    };
    draw = (context, ...args) => {
        const { representations, auxiliaries, callChildren } = this;
        const what = "draw" + funs.capitalize(context);
        const where = "graphic" + funs.capitalize(context);
        callChildren("representations", what, this[where], ...args);
        callChildren("auxiliaries", what, this[where], ...args);
    };
    drawBase = () => this.draw("base");
    drawHighlight = () => this.draw("highlight");
    drawUser = () => {
        if (this.active || !this.handlers.state.inMode("or"))
            this.draw("user");
    };
    initialize = () => {
        const { handlers, scales, callChildren, onMouseDownHere, onMouseDownAnywhere, onDoubleClick, onKeypress, onKeyRelease, drawBase, drawHighlight, drawUser, startDrag, whileDrag, endDrag, graphicContainer, graphicDiv, } = this;
        Object.keys(scales).forEach((mapping) => {
            scales[mapping]?.registerData(this.getUnique(mapping));
        });
        callChildren("representations", "registerScales", scales);
        callChildren("auxiliaries", "registerScales", scales);
        this.handlers.drag.state = this.handlers.state;
        graphicDiv.addEventListener("dblclick", onDoubleClick);
        graphicDiv.addEventListener("mousedown", onMouseDownAnywhere);
        graphicContainer.addEventListener("mousedown", onMouseDownHere);
        handlers.marker.registerCallbacks([drawHighlight], ["replaceTransient"]);
        handlers.state.registerCallbacks([drawUser], ["deactivateAll"]);
        handlers.drag.registerCallbacks([startDrag, whileDrag, endDrag, drawUser], ["startDrag", "whileDrag", "endDrag", "whileDrag"]);
        handlers.keypress.registerCallbacks([onKeypress, onKeyRelease, drawBase, drawHighlight], ["keyPressed", "keyReleased", "keyPressed", "keyPressed"]);
        drawBase();
    };
}
