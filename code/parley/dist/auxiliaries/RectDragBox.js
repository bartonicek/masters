import { Auxiliary } from "./Auxiliary.js";
export class RectDragBox extends Auxiliary {
    bgDrawn;
    constructor(handlers) {
        super();
        this.handlers = handlers;
        this.bgDrawn = false;
    }
    drawUser = (context) => {
        const { dragging, selectionPoints: points } = this.handlers.drag;
        const { current } = this.handlers.keypress;
        if (!this.bgDrawn) {
            context.drawDim();
            this.bgDrawn = true;
        }
        if (dragging && current === "ShiftLeft") {
            context.drawWindow([points[0], points[2]], [points[1], points[3]]);
        }
        else if (dragging) {
            context.drawClear();
            context.drawDim();
            context.drawWindow([points[0], points[2]], [points[1], points[3]]);
        }
        else {
            context.drawClear();
            this.bgDrawn = false;
        }
    };
}
