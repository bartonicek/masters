import * as examples from "./examples.js";
import { Handler } from "./handlers/Handler.js";
import { number } from "../../../../../../../../node_modules/mathjs/types/index.js";
const scene = examples.mpg();
export class MarkerHandler extends Handler {
    n;
    nPersistent;
    selected;
    current;
    past;
    constructor(n) {
        super();
        this.n = n;
        this.current = new MembershipArray(n);
        this.past = new MembershipArray(n);
        this.callbacks = [];
        this.when = [];
    }
    isOfMembership = (membership) => {
        const { current: curr, past } = this;
        let i = curr.length;
        const res = Array(curr.length);
        if (membership === 128) {
            while (i--)
                res[i] = curr[i] ? !!(curr[i] & 128) : !!(past[i] & 128);
            return res;
        }
        while (i--) {
            res[i] = curr[i]
                ? (curr[i] & ~128) >= membership
                : (past[i] & ~128) >= membership;
        }
        return res;
    };
    updateCurrent = (at, membership) => {
        this.current.update(at, membership);
        this.notifyAll("updateCurrent");
    };
    // Merge current into past
    mergeCurrent = () => {
        this.past.merge(this.current);
        this.notifyAll("mergeCurrent");
    };
    // Replaces current with past
    clearCurrent = () => (this.current = new MembershipArray([...this.past]));
    clearAll = () => {
        this.current.clear();
        this.past.clear();
    };
}
class MembershipArray extends Uint8Array {
    constructor(arg) {
        super(arg);
        if (typeof arg != number)
            this.fill(1);
    }
    clear = () => this.fill(1);
    toPersistent = () => {
        let i = this.length;
        while (i--) {
            this[i] = this[i] & ~128;
        }
        return this;
    };
    toTransient = () => {
        let i = this.length;
        while (i--) {
            this[i] = this[i] & 128;
        }
    };
    merge = (arr) => {
        let i = this.length;
        while (i--) {
            if (arr[i] === 1)
                continue;
            this[i] = arr[i];
        }
    };
    update = (at, membership) => {
        let i = at.length;
        if (membership === 128) {
            while (i--)
                this[at[i]] = this[at[i]] | 128;
            return;
        }
        while (i--)
            this[at[i]] = membership;
    };
}
const mm1 = new MarkerHandler(20);
mm1.updateCurrent([1, 2, 3, 4], 2);
mm1.updateCurrent([0, 3, 4, 5], 128);
mm1.mergeCurrent();
console.log([...mm1.current]);
console.log([...mm1.past]);
console.log(mm1.isOfMembership(2));
// const nPersistent = 2;
// const validMembershipArr = [...[...Array(nPersistent * 2 + 2).keys()], 255];
// type ValidMemberships = typeof validMembershipArr[number];
// const baseMembershipArr = [...validMembershipArr].slice(-nPersistent - 1, -1);
