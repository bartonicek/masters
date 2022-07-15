import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
import * as hndl from "../handlers/handlers.js";
export class Plot extends GraphicStack {
    marker;
    modes;
    scales;
    representations;
    auxiliaries;
    wranglers;
    handlers;
    freeze;
    constructor(marker) {
        super();
        this.marker = marker;
        this.modes = {
            OR: false,
        };
        this.representations = {};
        this.auxiliaries = {};
        this.wranglers = {};
        this.scales = {};
        this.handlers = {
            drag: new hndl.RectDragHandler(),
            keypress: new hndl.KeypressHandler(),
        };
        //this.freeze = false;
    }
    get active() {
        return this.graphicContainer.classList.contains("active");
    }
    // Calls a method [string] on each child of a property [string]
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
        return allPoints[0].map((_, i) => allPoints.some((points) => points[i]));
    };
    inSelection2 = (selPoints) => {
        const { mapChildren } = this;
        const allPoints = mapChildren("representations", "inSelection2", selPoints);
        return Array.from(new Set([].concat.apply([], allPoints)));
    };
    onSelection = () => {
        const { marker, handlers, inSelection } = this;
        if (handlers.keypress.current === "ShiftLeft") {
            marker.softReceive(inSelection(handlers.drag.selectionPoints));
        }
        else {
            marker.hardReceive(inSelection(handlers.drag.selectionPoints));
        }
    };
    onSelectionTransient = () => {
        const { marker, handlers, inSelection2 } = this;
        marker.replaceTransient(inSelection2(handlers.drag.selectionPoints), 1);
    };
    onSelectionPersistent = () => {
        const { marker, handlers, inSelection2 } = this;
        if (this.modes.OR) {
            marker.addPersistent(inSelection2(handlers.drag.selectionPoints), 1);
        }
    };
    onKeypress = () => {
        const { handlers, modes, callChildren } = this;
        if (handlers.keypress.last === "ShiftLeft")
            modes.OR = true;
        callChildren("handlers", "onKeyPress", handlers.keypress.last);
        if (this.active) {
            callChildren("representations", "onKeypress", handlers.keypress.current);
        }
    };
    onKeyRelease = () => {
        const { handlers, modes, callChildren } = this;
        if (handlers.keypress.last === "ShiftLeft")
            modes.OR = false;
        callChildren("handlers", "onKeyRelease", handlers.keypress.last);
        if (this.active) {
            callChildren("representations", "onKeyRelease", handlers.keypress.last);
        }
    };
    onDoubleClick = () => {
        this.callChildren("handlers", "onDoubleClick");
        this.marker.clear();
    };
    draw = (context, ...args) => {
        const { representations, auxiliaries, callChildren } = this;
        const what = "draw" + funs.capitalize(context);
        const where = "graphic" + funs.capitalize(context);
        callChildren("representations", what, this[where], ...args);
        callChildren("auxiliaries", what, this[where], ...args);
        // if (this.modes.OR)
        // this.graphicHighlight.drawPoints([400], [100], "green", null, 10);
    };
    drawBase = () => this.draw("base");
    drawHighlight = () => this.draw("highlight");
    drawUser = () => {
        this.active || !this.freeze ? this.draw("user") : null;
    };
    activateAll = () => {
        const graphicContainers = document.querySelectorAll(".graphicContainer");
        graphicContainers.forEach((e) => e.classList.add("active"));
    };
    deactivateAll = () => {
        const graphicContainers = document.querySelectorAll(".graphicContainer");
        graphicContainers.forEach((e) => e.classList.remove("active"));
    };
    initialize = () => {
        const { marker, handlers, scales, auxiliaries, representations, callChildren, onSelection, onKeypress, onKeyRelease, drawBase, drawHighlight, drawUser, graphicContainer, } = this;
        Object.keys(scales).forEach((mapping) => {
            scales[mapping]?.registerData(this.getUnique(mapping));
        });
        callChildren("representations", "registerScales", scales);
        callChildren("auxiliaries", "registerScales", scales);
        handlers.drag.registerCallbacks([onSelection], ["whileDrag"]);
        handlers.drag.registerCallbacks([this.onSelectionTransient, this.onSelectionPersistent], ["whileDrag", "startDrag"]);
        handlers.keypress.registerCallbacks([onKeypress, onKeyRelease, drawBase, drawHighlight], ["keyPressed", "keyReleased", "keyPressed", "keyPressed"]);
        marker.registerCallbacks(drawHighlight, drawUser);
        // For each handler, register event listeners for actions
        // and corresponding consequences on the graphiContainer
        Object.keys(handlers).forEach((name) => {
            const handler = handlers[name];
            handler?.actions?.forEach((action, index) => {
                graphicContainer.addEventListener(action, funs.throttle(handler[handler.consequences[index]], 50));
            });
        });
        handlers.keypress.actions.forEach((action, index) => {
            document.body.addEventListener(action, (event) => {
                handlers.keypress[handlers.keypress.consequences[index]](event);
            });
        });
        const graphicContainers = document.querySelectorAll(".graphicContainer");
        const graphicDiv = document.querySelector(".graphicDiv");
        graphicDiv.addEventListener("dblclick", (event) => {
            this.activateAll();
            marker.unSelect();
            this.onDoubleClick();
            this.deactivateAll();
        });
        graphicContainer.addEventListener("mousedown", (event) => {
            this.deactivateAll();
            event.currentTarget.classList.add("active");
        });
        drawBase();
    };
}
