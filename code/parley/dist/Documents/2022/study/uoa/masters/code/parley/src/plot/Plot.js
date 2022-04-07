import { GraphicStack } from "./GraphicStack.js";
import { Points } from "../geoms/Points.js";
export class Plot extends GraphicStack {
    data;
    mapping;
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
        this.geoms = { points1: new Points(this.data, this.mapping) };
    }
    collectX = () => {
        let set = new Set();
        Object.keys(this.geoms).forEach((e) => {
            this.geoms[e].statX.forEach((f) => set.add(f));
        });
        return Array.from(set);
    };
}
