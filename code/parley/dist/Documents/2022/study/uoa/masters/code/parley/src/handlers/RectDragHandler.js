import { Handler } from "./Handler.js";
import * as funs from "../functions.js";
export class RectDragHandler extends Handler {
    state;
    container;
    empty;
    dragging;
    selectionCurrent;
    selectionLast;
    selectionArray;
    constructor(container) {
        super();
        this.container = container;
        this.empty = true;
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
        if (!this.state.inMode("or"))
            this.clear();
        if (this.state.inMode("or") && this.lastComplete) {
            this.selectionArray.push([this.selectionLast[0], this.selectionLast[1]]);
        }
        this.dragging = true;
        this.selectionCurrent[0] = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        const { dragging, selectionCurrent, selectionLast, notifyAll } = this;
        if (dragging) {
            selectionCurrent[1] = [event.offsetX, event.offsetY];
            this.selectionLast = selectionCurrent;
            this.empty = false;
            const dist = (selectionCurrent[0][0] - selectionCurrent[1][0]) ** 2 +
                (selectionCurrent[0][1] - selectionCurrent[1][1]) ** 2;
            if (dist > 50)
                notifyAll("whileDrag");
        }
    };
    endDrag = () => {
        const { dragging, selectionArray, selectionLast } = this;
        this.dragging = false;
        if (this.state.inMode("or") && this.lastComplete) {
            selectionArray.push([selectionLast[0], selectionLast[1]]);
        }
        this.notifyAll("endDrag");
    };
    clear = () => {
        this.empty = true;
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
