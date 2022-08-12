import { Auxiliary } from "./Auxiliary.js";
export class HighlightRect extends Auxiliary {
    bgDrawn;
    constructor(handlers) {
        super();
        this.handlers = handlers;
        this.bgDrawn = false;
    }
    draw = (context, points) => {
        context.drawWindow([points[0][0], points[0][1]], [points[1][0], points[1][1]]);
    };
    drawUser = (context) => {
        const { drag, state } = this.handlers;
        if (!drag.empty && drag.dragging && state.inMode("or")) {
            context.drawClear();
            context.drawDim();
            drag.selectionArray.forEach((points) => {
                this.draw(context, points);
            });
            this.draw(context, drag.selectionLast);
        }
        else if (!drag.empty && drag.dragging) {
            context.drawClear();
            context.drawDim();
            this.draw(context, drag.selectionLast);
        }
        else {
            context.drawClear();
        }
    };
}
