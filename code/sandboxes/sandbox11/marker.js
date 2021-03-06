export class Marker {
  constructor(n) {
    this.selected = new Uint8Array(Array(n));
    this.callbacks = [];
  }

  receive(points) {
    this.selected = this.selected.map((e, i) => {
      return points.includes(i);
    });

    this.notifyAll();
  }

  registerCallback(callback, when) {
    // Add when later
    this.callbacks.push(callback);
  }

  notifyAll() {
    const self = this;
    this.callbacks.forEach((e) => e(self));
  }
}
