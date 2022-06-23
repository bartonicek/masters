export class Handler {
    actions;
    consequences;
    callbacks;
    // registerCallback = (callback: () => void) => {
    //   this.callbacks.push(callback);
    //   return this;
    // };
    registerCallbacks = (...callbacks) => {
        this.callbacks.push(...callbacks);
        return this;
    };
    notifyAll = () => {
        this.callbacks.forEach((callback) => callback());
    };
    reportKey = (event) => { };
}
