import { Handler } from "./Handler.js";
export class RectDragHandler extends Handler {
    dragging;
    modeOR;
    selectionPoints;
    selectionArray;
    constructor() {
        super();
        this.dragging = false;
        this.modeOR = false;
        this.selectionPoints = [
            [0, 0],
            [0, 0],
        ];
        this.selectionArray = [];
        this.actions = ["mousedown", "mousemove", "mouseup"];
        this.consequences = ["startDrag", "whileDrag", "endDrag"];
    }
    startDrag = (event) => {
        const { modeOR, selectionPoints, selectionArray } = this;
        if (modeOR)
            selectionArray.push([selectionPoints[0], selectionPoints[1]]);
        this.dragging = true;
        selectionPoints[0] = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        const { dragging, selectionPoints, notifyAll } = this;
        if (dragging) {
            selectionPoints[1] = [event.offsetX, event.offsetY];
            notifyAll("whileDrag");
        }
    };
    endDrag = () => {
        this.notifyAll("endDrag");
        this.dragging = false;
    };
    onKeyPress = (key) => {
        const { dragging, selectionArray, selectionPoints } = this;
        if (key === "ShiftLeft") {
            this.modeOR = true;
        }
    };
    onKeyRelease = (key) => {
        if (key === "ShiftLeft") {
            this.modeOR = false;
        }
    };
    onDoubleClick = () => {
        this.selectionArray = [];
        this.selectionPoints = [
            [0, 0],
            [0, 0],
        ];
    };
}
