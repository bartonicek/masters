export class Handler {
    actions;
    consequences;
    callbacks;
    when;
    constructor() {
        this.callbacks = [];
        this.when = [];
    }
    registerCallbacks = (callbacks, when) => {
        this.callbacks.push(...callbacks);
        this.when.push(...when);
        return this;
    };
    notifyAll = (when) => {
        this.callbacks
            .filter((e, i) => this.when[i] === when)
            .forEach((callback) => callback());
    };
}
