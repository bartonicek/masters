import { VectorGeneric } from "../datastructures.js";
import { Scale } from "./Scale.js";

export class ScaleDiscrete extends Scale {
  values: string[];
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
      ? (this.values = (arr as number[])
          .sort((a, b) => a - b)
          .map((e) => `${e}`))
      : this.values.sort().map((e) => `${e}`);

    this.positions = Array.from(
      Array(this.values.length),
      (e, i) => (i + 1) / (this.values.length + 1)
    );
  };

  dataToUnits = (x: any | any[]) => {
    const { values, length, direction, positions, offset } = this;
    const xs = this.toString(x);

    return typeof xs === "string"
      ? offset + direction * length * positions[values.indexOf(xs)]
      : xs.map(
          (e: any) => offset + direction * length * positions[values.indexOf(e)]
        );
  };
}
