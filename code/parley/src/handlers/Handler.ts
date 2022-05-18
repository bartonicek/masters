export class Handler {
  actions: string[];
  consequences: string[];
  callbacks: (() => void)[];
  selectionPoints: number[];

  registerCallback = (callback: () => void) => {
    this.callbacks.push(callback);
    return this;
  };

  notifyAll = () => {
    this.callbacks.forEach((callback) => callback());
  };
}
