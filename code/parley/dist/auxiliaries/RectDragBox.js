import { Auxiliary } from "./Auxiliary.js";
export class RectDragBox extends Auxiliary {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    drawUser = (context) => {
        const { dragging, selectionPoints: points } = this.handler;
        if (dragging) {
            context.drawClear();
            context.drawWindow([points[0], points[2]], [points[1], points[3]]);
        }
        else {
            context.drawClear();
        }
    };
}
