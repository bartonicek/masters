import { Identity2to2 } from "../statistics/identity2to2.js";
import { GraphicStack } from "./graphicStack.js";
export class Plot extends GraphicStack {
    data;
    mapping;
    //objects: Array<object>;
    marker;
    stats;
    geoms;
    constructor(data, mapping, 
    //objects: string[],
    marker) {
        super();
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.stats = [new Identity2to2(this.data, this.mapping)];
        this.geoms = [];
    }
}
