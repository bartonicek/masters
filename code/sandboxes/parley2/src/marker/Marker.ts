export class Marker {
  selected: Uint8Array;
  callbacks: Array<(data: object) => void>;

  constructor(n: number) {
    this.selected = new Uint8Array(Array(n));
    this.callbacks = [];
  }

  hardReceive(points: number[]) {
    this.selected = new Uint8Array(points);
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
