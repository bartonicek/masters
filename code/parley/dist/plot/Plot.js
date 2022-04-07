import { GraphicStack } from "./GraphicStack.js";
import { Points } from "../geoms/Points.js";
import { XYScaleContinuous } from "../scales/xyscalecontinuous.js";
export class Plot extends GraphicStack {
    data;
    mapping;
    marker;
    stats;
    scales;
    geoms;
    constructor(data, mapping, 
    //objects: string[],
    marker) {
        super();
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.geoms = { points1: new Points(this.data, this.mapping) };
        this.scales = {
            x: new XYScaleContinuous(this.uniqueStatX, this.width),
            y: new XYScaleContinuous(this.uniqueStatY, this.height),
        };
        this.initialize();
    }
    get uniqueStatX() {
        let set = new Set();
        Object.keys(this.geoms).forEach((geom) => {
            set = new Set([...set, ...new Set(this.geoms[geom].statX)]);
        });
        return Array.from(set);
    }
    get uniqueStatY() {
        let set = new Set();
        Object.keys(this.geoms).forEach((geom) => {
            set = new Set([...set, ...new Set(this.geoms[geom].statX)]);
        });
        return Array.from(set);
    }
    initialize = () => {
        Object.keys(this.geoms).forEach((e) => {
            this.geoms[e].registerScales(this.scales);
        });
    };
}
