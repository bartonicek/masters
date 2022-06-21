import { Handler } from "./Handler.js";
export class RectDragHandler extends Handler {
    dragging;
    selectionPoints;
    selectionArray;
    constructor() {
        super();
        this.dragging = false;
        this.selectionPoints = [
            [0, 0],
            [0, 0],
        ];
        this.selectionArray = [];
        this.callbacks = [];
        this.actions = ["mousedown", "mousemove", "mouseup"];
        this.consequences = ["startDrag", "whileDrag", "endDrag"];
    }
    startDrag = (event) => {
        this.dragging = true;
        this.selectionPoints[0] = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        if (this.dragging) {
            this.selectionPoints[1] = [event.offsetX, event.offsetY];
            this.notifyAll();
        }
    };
    endDrag = () => {
        this.dragging = false;
    };
}
