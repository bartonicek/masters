import { GraphicStack } from "./GraphicStack.js";
import * as funs from "../functions.js";
import * as hndl from "../handlers/handlers.js";
// export class Plot extends GraphicStack {
//   marker: Marker;
//   active: boolean;
//   scales: { [key: string]: scls.Scale };
//   representations: { [key: string]: reps.Representation };
//   auxiliaries: { [key: string]: auxs.Auxiliary };
//   wranglers: { [key: string]: Wrangler };
//   handlers: { [key: string]: hndl.Handler };
//   constructor(marker: Marker) {
//     super();
//     this.active = false;
//     this.marker = marker;
//     this.representations = {};
//     this.auxiliaries = {};
//     this.wranglers = {};
//     this.scales = {};
//     this.handlers = {};
//   }
//   // Call each child w/o returning anything
//   callChildren = (object: object, fun: string, ...args: any[]) => {
//     Object.keys(object).forEach((child) => {
//       object[child][fun] ? object[child][fun](...args) : null;
//     });
//   };
//   // Return something for each child
//   mapChildren = (object: object, fun: string, ...args: any[]) => {
//     return Object.keys(object).map((child) => {
//       return object[child][fun] ? object[child][fun](...args) : null;
//     });
//   };
//   getUnique = (variable: string) => {
//     const values = [].concat(
//       Object.keys(this.wranglers).flatMap((e) =>
//         this.wranglers[e][variable].extract()
//       )
//     );
//     return Array.from(new Set(values));
//   };
//   draw = (context: "base" | "highlight" | "user", ...args: any[]) => {
//     const { representations, auxiliaries, callChildren } = this;
//     const what = "draw" + funs.capitalize(context);
//     const where = "graphic" + funs.capitalize(context);
//     callChildren(representations, what, this[where], ...args);
//     callChildren(auxiliaries, what, this[where], ...args);
//   };
//   drawBase = () => this.draw("base");
//   drawHighlight = () => this.draw("highlight", this.marker.selected);
//   drawUser = () => this.draw("user");
//   inSelection = (selectionPoints: number[]) => {
//     const { representations, mapChildren } = this;
//     const allPoints = mapChildren(
//       representations,
//       "inSelection",
//       selectionPoints
//     );
//     return allPoints[0].map((_, i) => allPoints.some((e) => e[i]));
//   };
//   updateMarker = (selected: boolean[]) => {
//     this.marker.hardReceive(selected);
//   };
//   onSelection = () => {
//     // THIS IS STILL HARDCODED - NEED TO FIGURE OUT HOW TO DO FOR MULTIPLE HANDLERS?
//     const { updateMarker, inSelection } = this;
//     // funs.debounce(() => {
//     //   updateMarker(inSelection(this.handlers.draghandler.selectionPoints));
//     // }, 100)();
//     updateMarker(inSelection(this.handlers.draghandler.selectionPoints));
//   };
//   onKeypress = (key: string) => {
//     const { representations, mapChildren, callChildren } = this;
//     if (key === "KeyR") mapChildren(representations, "defaultize");
//     callChildren(representations, "onKeypress", key);
//   };
//   initialize = () => {
//     const {
//       marker,
//       wranglers,
//       handlers,
//       scales,
//       representations,
//       auxiliaries,
//       callChildren,
//       onSelection,
//       drawBase,
//       drawHighlight,
//       drawUser,
//     } = this;
//     Object.keys(scales).forEach((mapping) =>
//       this.scales[mapping]?.registerData(this.getUnique(mapping))
//     );
//     callChildren(representations, "registerScales", scales);
//     callChildren(auxiliaries, "registerScales", scales);
//     drawBase();
//     callChildren(handlers, "registerCallback", onSelection);
//     marker.registerCallback(drawHighlight);
//     marker.registerCallback(drawUser);
//     Object.keys(handlers).forEach((handlerName) => {
//       const handler = this.handlers[handlerName];
//       handler?.actions?.forEach((action, index) => {
//         this.graphicContainer.addEventListener(action, (event) => {
//           handler[handler.consequences[index]](event);
//         });
//       });
//     });
//     document.body.addEventListener("keyup", (event) => {
//       if (this.active) {
//         handlers.keypresshandler?.reportKey(event);
//         this.onKeypress(
//           (handlers?.keypresshandler as hndl.KeypressHandler)?.lastPressed
//         );
//         drawBase();
//         this.graphicHighlight.drawClear();
//         //this.drawUser();
//       }
//     });
//     document.body.addEventListener("dblclick", (event) => {
//       marker.unSelect();
//       this.graphicHighlight.drawClear();
//       this.graphicUser.drawClear();
//       this.active = this.active ? true : false;
//     });
//     document.body.addEventListener("mousedown", (event) => {
//       this.active = document
//         .getElementById(this.id)
//         .contains(event.target as Node)
//         ? true
//         : false;
//     });
//   };
// }
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
        this.handlers = {
            drag: new hndl.RectDragHandler(),
            keypress: new hndl.KeypressHandler(),
        };
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
    onSelection = () => {
        const { marker, inSelection } = this;
        marker.hardReceive(inSelection(this.handlers.draghandler.selectionPoints));
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
    drawUser = () => this.draw("user");
    initialize = () => {
        const { marker, handlers, scales, auxiliaries, representations, callChildren, onSelection, drawBase, drawHighlight, drawUser, graphicContainer, } = this;
        Object.keys(scales).forEach((mapping) => {
            scales[mapping]?.registerData(this.getUnique(mapping));
        });
        callChildren("representations", "registerScales", scales);
        callChildren("auxiliaries", "registerScales", scales);
        callChildren("handlers", "registerCallback", onSelection);
        marker.registerCallbacks(drawHighlight, drawUser);
        // For each handler, register event listeners for actions
        // and corresponding consequences on the graphiContainer
        Object.keys(handlers).forEach((name) => {
            const handler = handlers[name];
            handler?.actions?.forEach((action, index) => {
                graphicContainer.addEventListener(action, (event) => {
                    handler[handler.consequences[index]](event);
                });
            });
        });
        handlers.keypresshandler.actions.forEach((action, index) => {
            document.body.addEventListener(action, (event) => {
                handlers.keypresshandler[handlers.keypresshandler.consequences[index]](event);
            });
        });
        graphicContainer.addEventListener("dblclick", (event) => {
            marker.unSelect();
        });
        drawBase();
    };
}
