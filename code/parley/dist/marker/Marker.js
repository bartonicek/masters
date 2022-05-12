export class Marker {
    n;
    selected;
    callbacks;
    constructor(n) {
        this.n = n;
        this.selected = [];
        this.callbacks = [];
    }
    hardReceive(points) {
        this.selected = points;
        this.notifyAll();
    }
    softReceive(points) {
        this.selected = this.selected.concat(points);
        this.notifyAll();
    }
    addCallback(callback) {
        // Add when later
        this.callbacks.push(callback);
    }
    notifyAll() {
        const self = this;
        this.callbacks.forEach((e) => e(self));
    }
}
