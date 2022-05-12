//import { Scale } from "../scales/Scale.js";
export class Auxiliary {
    scales;
    handler;
    registerScales = (scales) => {
        this.scales = scales;
    };
    registerHandler = (handler) => {
        this.handler = handler;
    };
    drawUser = (context, handler) => { };
}
