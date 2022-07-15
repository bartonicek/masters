import * as dtstr from "../datastructures.js";
import { MembershipArray } from "./MembershipArray.js";

export class Marker {
  n: number;
  selected: boolean[];
  transientMembership: MembershipArray;
  persistentMembership: MembershipArray;
  callbacks: (() => void)[];

  constructor(n: number) {
    this.n = n;
    this.transientMembership = new MembershipArray(n);
    this.persistentMembership = new MembershipArray(n);
    this.selected = new Array(n).fill(false);
    this.callbacks = [];
  }

  hardReceive = (points: boolean[]) => {
    this.selected = points;
    this.notifyAll();
  };

  softReceive = (points: boolean[]) => {
    this.selected = this.selected.map((e, i) => e || points[i]);
    this.notifyAll();
  };

  replaceTransient = (at: number[], membership: dtstr.ValidMemberships) => {
    this.transientMembership.receiveClearReplace(at, membership);
    this.notifyAll();
  };

  addPersistent = (at: number[], membership: dtstr.ValidMemberships) => {
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

  registerCallbacks = (...callbacks: (() => void)[]) => {
    this.callbacks.push(...callbacks);
  };

  notifyAll() {
    this.callbacks.forEach((fun) => fun());
  }
}
