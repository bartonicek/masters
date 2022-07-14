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

  replaceTransient = (points: number[], group: 1 | 2 | 3) => {
    this.transientMembership.receiveReplace(points, group);
    this.notifyAll();
  };

  addPersistent = (points: number[], group: 1 | 2 | 3) => {
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

  registerCallbacks = (...callbacks: (() => void)[]) => {
    this.callbacks.push(...callbacks);
  };

  notifyAll() {
    this.callbacks.forEach((fun) => fun());
  }
}
