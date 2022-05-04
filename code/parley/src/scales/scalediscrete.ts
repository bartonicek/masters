export class ScaleDiscrete {
  values: (number | string | boolean)[];
  positions: number[];
  length: number;
  direction: number;
  offset: number;
  range: number;

  constructor(
    x: (number | string | boolean)[],
    length: number,
    direction = 1,
    expand = 0.1
  ) {
    this.values = Array.from(new Set(x)).sort();
    this.positions = this.values.map(
      (e, i) => expand + (1 - 2 * expand) * (i / (this.values.length - 1))
    );
    this.length = length;

    this.direction = direction;
    this.offset = this.direction === -1 ? this.length : 0;
  }

  dataToUnits = (x: number[]) => {
    const { values, length, direction, positions, offset } = this;
    return x.map(
      (e) => offset + direction * length * positions[values.indexOf(e)]
    );
  };
}
