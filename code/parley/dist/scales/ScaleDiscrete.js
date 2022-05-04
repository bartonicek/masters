import { Scale } from "./Scale.js";
export class ScaleDiscrete extends Scale {
    values;
    positions;
    constructor(length, direction = 1, expand = 0.1) {
        super(length, direction, expand);
    }
    registerData = (data) => {
        this.data = data;
        this.values = Array.from(new Set(data));
    };
    dataToUnits = (x) => {
        const { values, length, direction, positions, offset } = this;
        return x.map((e) => offset + direction * length * positions[values.indexOf(e)]);
    };
}
