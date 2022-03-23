class Marker {
  constructor(n) {
    this.selected = Array.from(Array(n), (e) => false);
    this.callBacks = {};
  }

  registerCallback(callback, name) {
    this.callBacks[name] = callback;
  }
}

class Plot {
  constructor(x) {
    this.x = x;
  }

  incrementX = () => {
    this.x *= 2;
  };
}

const x = 5;

const marker1 = new Marker(20);
const plot1 = new Plot(x);

// console.log(plot1.x);
// marker1.registerCallback(plot1.incrementX, "incrementX");
// marker1.callBacks.incrementX();
// console.log(plot1.x);

// console.log(Object.keys(marker1.callBacks));

class ScaleDiscrete {
  constructor(x, length, direction, expand = 0.1) {
    this.values = Array.from(new Set(x)).sort();
    this.length = length;
    this.range = this.values.length - 1;
    this.positions = this.values.map(
      (e, i) => expand + (1 - 2 * expand) * (i / (this.values.length - 1))
    );
    this.direction = direction;
    this.offset = this.direction === -1 ? this.length : 0;
  }

  dataToUnits(x) {
    const { values, length, positions, direction, offset } = this;
    return x.lenght > 1
      ? x.map((e) => offset + direction * length * positions[values.indexOf(e)])
      : offset + direction * length * positions[values.indexOf(x)];
  }
}

class XYScaleDiscrete extends ScaleDiscrete {
  constructor(
    x,
    length,
    direction,
    expand,
    margins = { lower: 0.1, upper: 0.1 }
  ) {
    super(x, length, direction, expand);
    this.margins = margins;

    // Shift & shrink the scale by the plot margins
    this.offset =
      this.offset + this.direction * this.length * this.margins.lower;
    this.length = (1 - this.margins.lower - this.margins.upper) * this.length;
  }

  dataToPlot(x) {
    return this.dataToUnits(x);
  }
}

const z = ["d", "a", "b", "a", "c", "a", "b"];
const zScale = new XYScaleDiscrete(z, 400, -1);

console.log(zScale.dataToPlot("a"));
