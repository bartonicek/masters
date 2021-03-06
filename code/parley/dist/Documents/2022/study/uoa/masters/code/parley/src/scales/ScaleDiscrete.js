import { Scale } from "./Scale.js";
export class ScaleDiscrete extends Scale {
    values;
    positions;
    constructor(length, direction = 1, expand = 0.1) {
        super(length, direction, expand);
        this.values = [];
    }
    toString = (x) => {
        if (typeof x === "string" || typeof x[0] === "string")
            return x;
        return x.length ? x.map((e) => `${e}`) : `${x}`;
    };
    registerData = (data) => {
        this.data = data;
        const arr = Array.from(new Set([...data]));
        this.values =
            typeof arr[0] === "number"
                ? arr.sort((a, b) => a - b)
                : arr.sort();
        this.positions = Array.from(Array(this.values.length), (e, i) => (i + 1) / (this.values.length + 1));
        return this;
    };
    dataToUnits = (x) => {
        const { values, length, direction, positions, offset } = this;
        const xString = this.toString(x);
        const valuesString = this.toString(values);
        if (typeof xString === "string") {
            return valuesString.indexOf(xString) !== -1
                ? offset + direction * length * positions[valuesString.indexOf(xString)]
                : null;
        }
        return xString.map((e) => valuesString.indexOf(e) !== -1
            ? offset + direction * length * positions[valuesString.indexOf(e)]
            : null);
    };
}
