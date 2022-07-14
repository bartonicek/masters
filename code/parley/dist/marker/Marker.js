import { MembershipArray } from "./MembershipArray.js";
export class Marker {
    n;
    selected;
    transientMembership;
    persistentMembership;
    callbacks;
    constructor(n) {
        this.n = n;
        this.transientMembership = new MembershipArray(n);
        this.persistentMembership = new MembershipArray(n);
        this.selected = new Array(n).fill(false);
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
    replaceTransient = (points, group) => {
        this.transientMembership.receiveReplace(points, group);
        this.notifyAll();
    };
    addPersistent = (points, group) => {
        this.persistentMembership.receiveAdd(points, group);
        this.notifyAll();
    };
    clearTransient = () => {
        this.transientMembership.clear();
        this.notifyAll();
    };
    clearPersistent = () => {
        this.persistentMembership.clear();
        this.notifyAll();
    };
    unSelect = () => {
        this.selected = Array.from(Array(this.n), (e) => false);
        this.notifyAll();
    };
    registerCallbacks = (...callbacks) => {
        this.callbacks.push(...callbacks);
    };
    notifyAll() {
        this.callbacks.forEach((fun) => fun());
    }
}
