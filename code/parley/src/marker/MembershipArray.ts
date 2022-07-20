import * as dtstr from "../datastructures.js";
export class MembershipArray extends Array<number> {
  put(val: number) {
    this.push(val);
  }

  clear = () => {
    this.fill(0);
  };

  merge = (arr: number[]) => {
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
