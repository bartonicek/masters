export class Marker {
    n;
    selected;
    callbacks;
    constructor(n) {
        this.n = n;
        this.selected = Array.from(Array(n), (e) => false);
        this.callbacks = [];
    }
    hardReceive = (points) => {
        this.selected = points;
        this.notifyAll();
    };
    softReceive = (points) => {
        this.selected = this.selected.map((e, i) => e || points[i]);
        this.notifyAll();
    };
    unSelect = () => {
        this.selected = Array.from(Array(this.n), (e) => false);
        this.notifyAll();
    };
    registerCallback(callback) {
        this.callbacks.push(callback);
    }
    registerCallbacks = (...callbacks) => {
        this.callbacks.push(...callbacks);
    };
    notifyAll() {
        this.callbacks.forEach((fun) => fun());
    }
}
