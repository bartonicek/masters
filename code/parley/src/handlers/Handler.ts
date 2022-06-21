export class Handler {
  actions: string[];
  consequences: string[];
  callbacks: (() => void)[];

  // registerCallback = (callback: () => void) => {
  //   this.callbacks.push(callback);
  //   return this;
  // };

  registerCallbacks = (...callbacks: (() => void)[]) => {
    this.callbacks.push(...callbacks);
    return this;
  };

  notifyAll = () => {
    this.callbacks.forEach((callback) => callback());
  };

  reportKey = (event) => {};
}
