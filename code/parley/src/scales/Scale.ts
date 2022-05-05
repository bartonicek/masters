import { VectorGeneric } from "../datastructures.js";

export type ScaleType = {
  data: VectorGeneric;
  length: number;
  direction: number;
  expand: number;
  offset: number;
};

export class Scale implements ScaleType {
  data: VectorGeneric;
  length: number;
  direction: number;
  expand: number;
  offset: number;

  constructor(length: number, direction = 1, expand = 0.1) {
    this.length = length;
    this.direction = direction;
    this.expand = expand;
    this.offset = this.direction === -1 ? this.length : 0;
  }

  registerData = (data: VectorGeneric) => {
    this.data = data;
  };

  pctToUnits = (pct: number | number[]) => {
    const { length, offset, direction } = this;
    return typeof pct === "number"
      ? offset + direction * length * pct
      : pct.map((e) => offset + direction * length * e);
  };

  unitsToPct = (units: number | number[]) => {
    const { length } = this;
    return typeof units === "number"
      ? units / length
      : units.map((e) => e / length);
  };
}
