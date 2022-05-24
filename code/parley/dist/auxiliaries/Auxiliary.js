//import { Scale } from "../scales/Scale.js";
export class Auxiliary {
    scales;
    handler;
    registerScales = (scales) => {
        this.scales = scales;
        return this;
    };
    draw = (context) => { };
    drawBase = (context) => { };
    drawUser = (context, handler) => { };
}
