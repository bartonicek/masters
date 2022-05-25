export class Handler {
    actions;
    consequences;
    callbacks;
    selectionPoints;
    registerCallback = (callback) => {
        this.callbacks.push(callback);
        return this;
    };
    notifyAll = () => {
        this.callbacks.forEach((callback) => callback());
    };
    reportKey = (event) => { };
}
