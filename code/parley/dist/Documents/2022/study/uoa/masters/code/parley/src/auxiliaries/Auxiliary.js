//import { Scale } from "../scales/Scale.js";
export class Auxiliary {
    scales;
    handler;
    registerScales = (scales) => {
        this.scales = scales;
        return this;
    };
    drawUser = (context, handler) => { };
}
