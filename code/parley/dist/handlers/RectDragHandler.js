export class RectDragHandler {
    dragging;
    dragNodes;
    callbacks;
    constructor() {
        this.dragging = false;
        this.dragNodes = { start: [0, 0], end: [0, 0] };
        this.callbacks = [];
    }
    startDrag = (event) => {
        this.dragging = true;
        this.dragNodes.start = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        if (this.dragging) {
            this.dragNodes.end = [event.offsetX, event.offsetY];
            this.notifyAll();
        }
    };
    endDrag = () => {
        this.dragging = false;
    };
    registerCallback = (callback) => {
        this.callbacks.push(callback);
        return this;
    };
    notifyAll = () => {
        this.callbacks.forEach((e) => e());
    };
}
