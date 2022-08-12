import * as dtstr from "../datastructures.js";
import { Handler } from "./Handler.js";
import { Plot } from "../plot/Plot.js";

export class MarkerHandler extends Handler {
  n: number;
  selected: boolean[];
  transientMembership: MembershipArray;
  persistentMembership: MembershipArray;

  constructor(n: number) {
    super();
    this.n = n;
    this.transientMembership = new MembershipArray(n).fill(0);
    this.persistentMembership = new MembershipArray(n).fill(0);
    this.callbacks = [];
    this.when = [];
  }

  replaceTransient = (at: number[], membership: dtstr.ValidMemberships) => {
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
}

class MembershipArray extends Uint8Array {
  constructor(n: number) {
    super(n);
  }

  clear = () => {
    this.fill(0);
  };

  merge = (arr: MembershipArray) => {
    arr.forEach((e, i) => (e !== 0 ? (this[i] = e) : null));
  };

  recieveReplace = (at: number[], membership: dtstr.ValidMemberships) => {
    at.forEach((e) => (this[e] = membership));
  };

  receiveClearReplace = (at: number[], membership: dtstr.ValidMemberships) => {
    this.clear();
    at.forEach((e) => (this[e] = membership));
  };
}
