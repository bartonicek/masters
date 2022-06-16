import { Handler } from "./Handler.js";
import * as funs from "../functions.js";
export class RectDragHandler extends Handler {
    dragging;
    constructor() {
        super();
        this.dragging = false;
        this.selectionPoints = [0, 0, 0, 0];
        this.callbacks = [];
        this.actions = ["mousedown", "mousemove", "mouseup"];
        this.consequences = ["startDrag", "whileDrag", "endDrag"];
    }
    startDrag = (event) => {
        this.dragging = true;
        this.selectionPoints[0] = event.offsetX;
        this.selectionPoints[2] = event.offsetY;
    };
    whileDrag = (event) => {
        if (this.dragging) {
            this.selectionPoints[1] = event.offsetX;
            this.selectionPoints[3] = event.offsetY;
            funs.throttle(() => this.notifyAll(), 1000);
        }
    };
    // debouncedWhileDrag = (event: { offsetX: number; offsetY: number }) => {
    //   funs.debounce(() => this.whileDrag(event), 100)(event);
    // };
    endDrag = () => {
        this.dragging = false;
    };
}
