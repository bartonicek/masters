import { Auxiliary } from "./Auxiliary.js";
export class HighlightRects extends Auxiliary {
    bgDrawn;
    current;
    last;
    pastArray;
    constructor(handlers) {
        super();
        this.current = [
            [null, null],
            [null, null],
        ];
        this.last = [
            [null, null],
            [null, null],
        ];
        this.pastArray = [];
        this.handlers = handlers;
        this.bgDrawn = false;
    }
    get lastComplete() {
        return !this.last.flat().some((e) => e === null);
    }
    updateCurrentOrigin = (point) => {
        this.current[0] = point;
    };
    updateCurrentEndpoint = (point) => {
        this.current[1] = point;
    };
    updateLast = () => {
        this.last = [this.current[0], this.current[1]];
    };
    pushLastToPast = () => {
        this.pastArray.push([this.last[0], this.last[1]]);
    };
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
