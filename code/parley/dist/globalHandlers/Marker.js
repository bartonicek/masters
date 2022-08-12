import { Handler } from "../Handler.js";
import { Plot } from "../plot/Plot.js";
export class Marker extends Handler {
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
    };
    clearIfNOr = () => {
        if (!Plot.globalModes.or) {
            this.transientMembership.clear();
            this.persistentMembership.clear();
        }
    };
}
class MembershipArray extends Array {
    put(val) {
        this.push(val);
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
