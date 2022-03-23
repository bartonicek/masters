export class ScaleDiscrete {
  constructor(x, length, direction, expand = 0.1) {
    this.values = Array.from(new Set(x)).sort();
    this.length = length;

    this.direction = direction;
    this.offset = this.direction === -1 ? this.length : 0;

    this.range = this.values.length - 1;
    this.positions = this.values.map(
      (e, i) => expand + (1 - 2 * expand) * (i / (this.values.length - 1))
    );
  }

  dataToUnits(x) {
    const { values, length, direction, expand, positions, offset } = this;

    return x.length > 1
      ? x.map((e) => offset + direction * length * positions[values.indexOf(e)])
      : offset + direction * length * positions[values.indexOf(x)];
  }
}
