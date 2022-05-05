import { Scale } from "./Scale.js";

export class ScaleContinuous extends Scale {
  data: number[] = [];

  constructor(length: number, direction = 1, expand = 0.1) {
    super(length, direction, expand);
  }

  registerData = (data: number[]) => {
    this.data = data;
  };

  get dataMin() {
    const { data, expand } = this;
    return Math.min(...data) - expand * (Math.max(...data) - Math.min(...data));
  }

  get dataMax() {
    const { data, expand } = this;
    return Math.max(...data) + expand * (Math.max(...data) - Math.min(...data));
  }

  get range() {
    return this.dataMax - this.dataMin;
  }

  pctToData = (pct: number | number[]) => {
    const { dataMin, range } = this;
    return typeof pct === "number"
      ? dataMin + pct * range
      : pct.map((e) => dataMin + e * range);
  };

  dataToPct = (data: number | number[]) => {
    const { dataMin, range } = this;
    return typeof data === "number"
      ? (data - dataMin) / range
      : data.map((e) => (e - dataMin) / range);
  };

  dataToUnits = (data: number | number[]) => {
    const { dataMin, length, offset, direction, range } = this;
    return typeof data === "number"
      ? offset + (direction * length * (data - dataMin)) / range
      : data.map((e) => offset + direction * length * ((e - dataMin) / range));
  };

  unitsToData = (units: number | number[]) => {
    const { dataMin, length, offset, direction, range } = this;
    return typeof units === "number"
      ? dataMin + (direction * range * (units - offset)) / length
      : units.map((e) => dataMin + direction * range * ((e - offset) / length));
  };
}
