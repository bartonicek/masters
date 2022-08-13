import { Handler } from "./Handler.js";
export class MarkerHandler extends Handler {
    n;
    selected;
    transientMembership;
    persistentMembership;
    constructor(n) {
        super();
        this.n = n;
        this.transientMembership = new MembershipArray(n).fill(0);
        this.persistentMembership = new MembershipArray(n).fill(0);
        this.callbacks = [];
        this.when = [];
    }
    replaceTransient = (at, membership) => {
        this.transientMembership.receiveClearReplace(at, membership);
        this.notifyAll("replaceTransient");
    };
    mergeTransient = () => {
        this.persistentMembership.merge(this.transientMembership);
        this.notifyAll("mergeTransient");
    };
    clear = () => {
        this.transientMembership.clear();
        this.persistentMembership.clear();
        this.notifyAll("clear");
    };
    onKeypress = (key) => {
        if (key === "ShiftLeft")
            this.mergeTransient();
    };
}
class MembershipArray extends Uint8Array {
    constructor(n) {
        super(n);
    }
    clear = () => {
        this.fill(0);
    };
    merge = (arr) => {
        arr.forEach((e, i) => (e !== 0 ? (this[i] = e) : null));
    };
    recieveReplace = (at, membership) => {
        at.forEach((e) => (this[e] = membership));
    };
    receiveClearReplace = (at, membership) => {
        this.clear();
        at.forEach((e) => (this[e] = membership));
    };
}
