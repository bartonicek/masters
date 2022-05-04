import { VectorGeneric } from "../datastructures.js";
import { Scale } from "./Scale.js";

export class ScaleDiscrete extends Scale {
  values: (number | string | boolean)[];
  positions: number[];

  constructor(length: number, direction = 1, expand = 0.1) {
    super(length, direction, expand);
  }

  registerData = (data: VectorGeneric) => {
    this.data = data;
    this.values = Array.from(new Set(data));
  };

  dataToUnits = (x: number[]) => {
    const { values, length, direction, positions, offset } = this;
    return x.map(
      (e) => offset + direction * length * positions[values.indexOf(e)]
    );
  };
}
