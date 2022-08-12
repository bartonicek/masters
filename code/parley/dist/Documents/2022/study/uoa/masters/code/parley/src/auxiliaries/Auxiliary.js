//import { Scale } from "../scales/Scale.js";
export class Auxiliary {
    scales;
    handler;
    handlers;
    registerScales = (scales) => {
        this.scales = scales;
        return this;
    };
    draw = (context, ...args) => { };
    drawBase = (context, ...args) => { };
    drawUser = (context, handler, ...args) => { };
}
