import { Auxiliary } from "./Auxiliary.js";
export class RectDragBox extends Auxiliary {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    drawUser = (context) => {
        if (this.handler.dragging) {
            context.drawClear();
            const points = this.handler.selectionPoints;
            context.drawWindow([points[0], points[2]], [points[1], points[3]]);
        }
        else {
            context.drawClear();
        }
    };
}
