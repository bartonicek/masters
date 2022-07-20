import { MembershipArray } from "./MembershipArray.js";
export class Marker {
    n;
    selected;
    transientMembership;
    persistentMembership;
    callbacks;
    when;
    constructor(n) {
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
    // addPersistent = (at: number[], membership: dtstr.ValidMemberships) => {
    //   this.persistentMembership.recieveReplace(at, membership);
    //   this.notifyAll("addPersistent");
    // };
    clear = () => {
        this.transientMembership.clear();
        this.persistentMembership.clear();
    };
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
