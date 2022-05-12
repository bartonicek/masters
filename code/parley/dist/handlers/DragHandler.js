export class RectDragHandler {
    dragging;
    dragNodes;
    callbacks;
    constructor() {
        this.dragging = false;
        this.dragNodes = [
            [0, 0],
            [0, 0],
        ];
        this.callbacks = [];
    }
    startDrag = (event) => {
        this.dragging = true;
        this.dragNodes[0] = [event.offsetX, event.offsetY];
    };
    whileDrag = (event) => {
        if (this.dragging) {
            this.dragNodes[1] = [event.offsetX, event.offsetY];
            this.notifyAll();
        }
    };
    endDrag = (event) => {
        this.dragging = false;
    };
    notifyAll = () => {
        const self = this;
        this.callbacks.forEach((e) => e(self));
    };
}
