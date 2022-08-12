import { Handler } from "../Handler.js";
import * as funs from "../functions.js";
import { Plot } from "../plot/Plot.js";
export class RectDragHandler extends Handler {
    container;
    dragging;
    selectionCurrent;
    selectionLast;
    selectionArray;
    constructor(container) {
        super();
        this.container = container;
        this.dragging = false;
        this.selectionCurrent = [
            [null, null],
            [null, null],
        ];
        this.selectionLast = [
            [null, null],
            [null, null],
        ];
        this.selectionArray = [];
        this.actions = ["mousedown", "mousemove", "mouseup"];
        this.consequences = ["startDrag", "whileDrag", "endDrag"];
        // Register mouse behavior on the container, throttled to 50ms
        this.actions.forEach((action, i) => {
            this.container.addEventListener(action, funs.throttle(this[this.consequences[i]], 50));
        });
    }
    get lastSelection() {
        return this.selectionLast;
    }
    get lastComplete() {
        return !this.selectionLast.flat().some((e) => e === null);
    }
    startDrag = (event) => {
        const { selectionArray, selectionLast } = this;
        this.notifyAll("startDrag");
        if (!Plot.globalModes.or)
            this.clear();
        if (Plot.globalModes.or && this.lastComplete) {
            this.selectionArray.push([this.selectionLast[0], this.selectionLast[1]]);
        }
        this.dragging = true;
        this.selectionCurrent[0] = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        const { dragging, selectionCurrent: selectionPoints, notifyAll } = this;
        if (dragging) {
            selectionPoints[1] = [event.offsetX, event.offsetY];
            notifyAll("whileDrag");
        }
    };
    endDrag = () => {
        const { dragging, selectionArray, selectionCurrent, selectionLast } = this;
        this.dragging = false;
        this.selectionLast = selectionCurrent;
        if (Plot.globalModes.or && this.lastComplete) {
            selectionArray.push([selectionLast[0], selectionLast[1]]);
        }
        this.notifyAll("endDrag");
    };
    clear = () => {
        this.selectionArray = [];
        this.selectionLast = [
            [null, null],
            [null, null],
        ];
    };
    onDoubleClick = () => {
        this.clear();
    };
}
