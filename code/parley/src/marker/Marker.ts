export class Marker {
  n: number;
  selected: boolean[];
  callbacks: (() => void)[];

  constructor(n: number) {
    this.n = n;
    this.selected = Array.from(Array(n), (e) => false);
    this.callbacks = [];
  }

  hardReceive = (points: boolean[]) => {
    this.selected = points;
    this.notifyAll();
  };

  softReceive = (points: boolean) => {
    this.selected = this.selected.map((e, i) => e || points[i]);
    this.notifyAll();
  };

  unSelect = () => {
    this.selected = Array.from(Array(this.n), (e) => false);
    this.notifyAll();
  };

  registerCallback(callback: () => void) {
    this.callbacks.push(callback);
  }

  registerCallbacks = (...callbacks: (() => void)[]) => {
    this.callbacks.push(...callbacks);
  };

  notifyAll() {
    this.callbacks.forEach((fun) => fun());
  }
}
