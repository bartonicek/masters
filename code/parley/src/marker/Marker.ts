export class Marker {
  n: number;
  selected: number[];
  callbacks: ((marker: Marker) => void)[];

  constructor(n: number) {
    this.n = n;
    this.selected = [];
    this.callbacks = [];
  }

  hardReceive(points: number[]) {
    this.selected = points;
    this.notifyAll();
  }

  softReceive(points: number[]) {
    this.selected = this.selected.concat(points);
    this.notifyAll();
  }

  addCallback(callback: (marker: object) => void) {
    // Add when later
    this.callbacks.push(callback);
  }

  notifyAll() {
    const self = this;
    this.callbacks.forEach((e) => e(self));
  }
}
