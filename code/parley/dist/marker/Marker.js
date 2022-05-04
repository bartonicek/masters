export class Marker {
    selected;
    callbacks;
    constructor(n) {
        this.selected = new Uint8Array(Array(n));
        this.callbacks = [];
    }
    hardReceive(points) {
        this.selected = new Uint8Array(points);
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
