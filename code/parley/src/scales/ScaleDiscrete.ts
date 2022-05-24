import { VectorGeneric } from "../datastructures.js";
import { Scale } from "./Scale.js";

export class ScaleDiscrete extends Scale {
  values: VectorGeneric;
  positions: number[];

  constructor(length: number, direction = 1, expand = 0.1) {
    super(length, direction, expand);
    this.values = [];
  }

  toString = (x: any | any[]) => {
    return x.length ? x.map((e) => `${e}`) : `${x}`;
  };

  registerData = (data: VectorGeneric) => {
    this.data = data;
    const arr = Array.from(new Set([...data]));

    typeof arr[0] === "number"
      ? (this.values = (arr as number[]).sort((a, b) => a - b))
      : //.map((e) => `${e}`))
        this.values.sort().map((e) => `${e}`);

    this.positions = Array.from(
      Array(this.values.length),
      (e, i) => (i + 1) / (this.values.length + 1)
    );
    return this;
  };

  dataToUnits = (x: any | any[]) => {
    const { values, length, direction, positions, offset } = this;
    const xString = this.toString(x);
    const valuesString = this.toString(values);

    if (typeof xString === "string") {
      return valuesString.indexOf(xString) !== -1
        ? offset + direction * length * positions[valuesString.indexOf(xString)]
        : null;
    }

    return xString.map((e: any) =>
      valuesString.indexOf(e) !== -1
        ? offset + direction * length * positions[valuesString.indexOf(e)]
        : null
    );
  };
}
