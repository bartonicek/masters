import { Handler } from "./Handler.js";
export class MarkerHandler extends Handler {
    n;
    selected;
    currentTransient;
    currentPersistent;
    pastTransient;
    pastPersistent;
    // Membership values:
    //  255: No membership, unchanged
    //  0: No membership, changed (i.e. membership removed)
    //  1: Basic highlighting
    //  2-6: Group highlighting
    constructor(n) {
        super();
        this.n = n;
        this.currentTransient = new MembershipArray(n).fill(255);
        this.currentPersistent = new MembershipArray(n).fill(255);
        this.pastTransient = new MembershipArray(n).fill(255);
        this.pastPersistent = new MembershipArray(n).fill(255);
        this.callbacks = [];
        this.when = [];
    }
    isOfLowerOrEqualMembership = (index, membership) => {
        return membership > 1
            ? this.currentPersistent[index] <= membership ||
                this.pastPersistent[index] <= membership
            : this.currentTransient[index] === 1 || this.pastTransient[index] === 1;
    };
    getArray = (type, membership) => {
        return this[type + ["Transient", "Persistent"][membership > 1 ? 1 : 0]];
    };
    replaceTemporary = (at, membership) => {
        this.getArray("current", membership).receiveClearReplace(at, membership);
        this.notifyAll("replaceTemporary");
    };
    mergeTemporary = () => {
        this.pastTransient.merge(this.currentTransient);
        this.pastPersistent.merge(this.currentPersistent);
        this.notifyAll("mergeTemporary");
    };
    clearTransient = () => {
        this.currentTransient.clear();
        this.pastTransient.clear();
    };
    clearAll = () => {
        this.currentTransient.clear();
        this.currentPersistent.clear();
        this.pastTransient.clear();
        this.pastPersistent.clear();
    };
}
export class MembershipArray extends Uint8Array {
    constructor(n) {
        super(n);
    }
    clear = () => {
        this.fill(255);
    };
    merge = (arr) => {
        arr.forEach((e, i) => (e !== 255 ? (this[i] = e) : null));
    };
    recieveReplace = (at, membership) => {
        at.forEach((e) => (this[e] = membership));
    };
    receiveClearReplace = (at, membership) => {
        this.clear();
        at.forEach((e) => (this[e] = membership));
    };
}
