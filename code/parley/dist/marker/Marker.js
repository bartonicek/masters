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
    replaceTransient = (at, membership) => {
        this.transientMembership.receiveClearReplace(at, membership);
        this.notifyAll();
    };
    addPersistent = (at, membership) => {
        this.persistentMembership.recieveReplace(at, membership);
        this.notifyAll();
    };
    clear = () => {
        this.transientMembership.clear();
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
