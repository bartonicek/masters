import * as funs from "../functions.js";
import { Handler } from "./Handler.js";
export class DragHandler extends Handler {
    state;
    container;
    dragging;
    start;
    end;
    constructor(container) {
        super();
        this.container = container;
        this.dragging = false;
        this.start = [null, null];
        this.end = [null, null];
        this.actions = ["mousedown", "mousemove", "mouseup"];
        this.consequences = ["startDrag", "whileDrag", "endDrag"];
        // Register mouse behavior on the container, throttled to 50ms
        this.actions.forEach((action, i) => {
            this.container.addEventListener(action, funs.throttle(this[this.consequences[i]], 50));
        });
    }
    startDrag = (event) => {
        this.dragging = true;
        this.start = [event.offsetX, event.offsetY];
        this.notifyAll("startDrag");
    };
    whileDrag = (event) => {
        const { dragging, notifyAll } = this;
        if (dragging) {
            this.end = [event.offsetX, event.offsetY];
            const dist = (this.start[0] - this.end[0]) ** 2 + (this.start[1] - this.end[1]) ** 2;
            if (dist > 50)
                notifyAll("whileDrag");
        }
    };
    endDrag = () => {
        this.dragging = false;
        this.notifyAll("endDrag");
    };
}
