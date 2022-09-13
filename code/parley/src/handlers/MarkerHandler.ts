import * as dtstr from "../datastructures.js";
import { Handler } from "./Handler.js";
import { Plot } from "../plot/Plot.js";

export class MarkerHandler extends Handler {
  n: number;
  selected: boolean[];
  currentTransient: MembershipArray;
  currentPersistent: MembershipArray;
  pastTransient: MembershipArray;
  pastPersistent: MembershipArray;

  // Membership values:
  //  255: No membership, unchanged
  //  0: No membership, changed (i.e. membership removed)
  //  1: Basic highlighting
  //  2-6: Group highlighting

  constructor(n: number) {
    super();
    this.n = n;
    this.currentTransient = new MembershipArray(n);
    this.currentPersistent = new MembershipArray(n);
    this.pastTransient = new MembershipArray(n);
    this.pastPersistent = new MembershipArray(n);

    this.callbacks = [];
    this.when = [];
  }

  isOfLowerOrEqualMembership = (
    index: number,
    membership: dtstr.ValidMemberships
  ) => {
    if (membership > 1 && this.currentPersistent[index] < 255) {
      return this.currentPersistent[index] <= membership;
    } else if (membership > 1) {
      return this.pastPersistent[index] <= membership;
    } else {
      return (
        this.currentTransient[index] === 1 || this.pastTransient[index] === 1
      );
    }
  };

  getArray = (type: "current" | "past", membership: number) => {
    return this[type + ["Transient", "Persistent"][membership > 1 ? 1 : 0]];
  };

  replaceTemporary = (at: number[], membership: dtstr.ValidMemberships) => {
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
  constructor(n: number) {
    super(n);
    this.fill(255);
  }

  clear = () => {
    this.fill(255);
  };

  merge = (arr: MembershipArray) => {
    arr.forEach((e, i) => (e !== 255 ? (this[i] = e) : null));
  };

  recieveReplace = (at: number[], membership: dtstr.ValidMemberships) => {
    at.forEach((e) => (this[e] = membership));
  };

  receiveClearReplace = (at: number[], membership: dtstr.ValidMemberships) => {
    this.clear();
    at.forEach((e) => (this[e] = membership));
  };
}
