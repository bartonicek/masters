export class ScaleContinuous {
  constructor(x, length, direction = 1, expand = 0.1) {
    this.dataMin = Math.min(...x) - expand * (Math.max(...x) - Math.min(...x));
    this.dataMax = Math.max(...x) + expand * (Math.max(...x) - Math.min(...x));
    this.length = length;
    this.direction = direction;
    this.offset = this.direction === -1 ? this.length : 0;
  }

  get range() {
    return this.dataMax - this.dataMin;
  }

  pctToData = (x) => {
    const { dataMin, range } = this;
    return x.length > 1
      ? x.map((e) => dataMin + e * range)
      : dataMin + x * range;
  };

  // dataToPct = (x) => {
  //   const { min, range, length } = this;
  //   return x.length > 1 ? x : x;
  // };

  dataToUnits = (x) => {
    const { dataMin, length, offset, direction, range } = this;
    return x.length > 1
      ? x.map((e) => offset + direction * length * ((e - dataMin) / range))
      : offset + direction * length * ((x - dataMin) / range);
  };

  unitsToData = (x) => {
    const { dataMin, length, offset, direction, range } = this;
    return x.length > 1
      ? x.map((e) => dataMin + direction * range * ((e - offset) / length))
      : dataMin + direction * range * ((x - offset) / length);
  };

  pctToUnits = (x) => {
    const { length, offset, direction } = this;
    return x.length > 1
      ? x.map((e) => offset + direction * length * e)
      : offset + direction * length * x;
  };

  unitsToPct = (x) => {
    const { length, offset } = this;
    return x.length > 1 ? x.map((e) => e / length) : x / (length + offset);
  };
}
