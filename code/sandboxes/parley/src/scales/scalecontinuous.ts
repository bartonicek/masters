export class ScaleContinuous {
  x: number[];
  length: number;
  direction: number;
  dataMin: number;
  dataMax: number;
  offset: number;

  constructor(x: number[], length: number, direction = 1, expand = 0.2) {
    this.length = length;
    this.direction = direction;
    this.dataMin = Math.min(...x) - expand * (Math.max(...x) - Math.min(...x));
    this.dataMax = Math.max(...x) + expand * (Math.max(...x) - Math.min(...x));
    this.offset = this.direction === -1 ? this.length : 0;
  }

  get range() {
    return this.dataMax - this.dataMin;
  }

  pctToData = (x: number | number[]) => {
    const { dataMin, range } = this;
    return typeof x === "number"
      ? dataMin + x * range
      : x.map((e) => dataMin + e * range);
  };

  dataToPCt = (x: number | number[]) => {
    const { dataMin, range } = this;
    return typeof x === "number"
      ? (x - dataMin) / range
      : x.map((e) => (e - dataMin) / range);
  };

  dataToUnits = (x: number | number[]) => {
    const { dataMin, length, offset, direction, range } = this;
    return typeof x === "number"
      ? offset + (direction * length * (x - dataMin)) / range
      : x.map((e) => offset + direction * length * ((e - dataMin) / range));
  };

  unitsToData = (x: number | number[]) => {
    const { dataMin, length, offset, direction, range } = this;
    return typeof x === "number"
      ? dataMin + (direction * range * (x - offset)) / length
      : x.map((e) => dataMin + direction * range * ((e - offset) / length));
  };

  pctToUnits = (x: number | number[]) => {
    const { length, offset, direction } = this;
    return typeof x === "number"
      ? offset + direction * length * x
      : x.map((e) => offset + direction * length * e);
  };

  unitsToPct = (x: number | number[]) => {
    const { length } = this;
    return typeof x === "number" ? x / length : x.map((e) => e / length);
  };
}
