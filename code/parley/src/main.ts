import * as examples from "./examples.js";
import { DataFrame } from "./DataFrame.js";
import * as dtstr from "./datastructures.js";
import * as funs from "./functions.js";
import { globalParameters } from "./globalparameters.js";
import { Mapping } from "./Mapping.js";
import { ScatterPlot } from "./plot/ScatterPlot.js";
import { Scene } from "./Scene.js";
import { GraphicLayer } from "./plot/GraphicLayer.js";
import { MembershipArray } from "./handlers/MarkerHandler.js";
import { Handler } from "./handlers/Handler.js";

const scene = examples.mtcars();

// console.log(arr.map((e) => e & 1));
// console.log(arr2.map((e) => e & 1));

export class MarkerHandler2 extends Handler {
  n: number;
  selected: boolean[];
  current: MembershipArray2;
  past: MembershipArray2;

  constructor(n: number) {
    super();
    this.n = n;
    this.current = new MembershipArray2(n);
    this.past = new MembershipArray2(n);

    this.callbacks = [];
    this.when = [];
  }

  // Is 1? >true if in {1, 3, 5,...}    (transient, any)
  // Is 2? >true if in {2, 3}           (persistent or transient of 2)
  // Is 3? >true if {3}                 (transient of 2 only)
  // Is 4? >true if {2, 3, 4, 5}        (persistent or transient of 2 or 4)
  // Is 5? >true if {3, 5}              (transient of 2 or 4 only)
  // ...
  isOfMembership = (index: number, membership: dtstr.ValidMemberships) => {
    if (membership === 0) return true;
    if (!this.current[index] && !this.past[index]) return false;

    const currVal = this.current[index];
    const pastVal = this.past[index];

    // Check if transient
    if (membership === 1 && currVal) return currVal % 2 === 1;
    if (membership === 1) return pastVal % 2 === 1;

    // Check if persistent + transient
    if (membership % 2 && currVal > 1) {
      return currVal <= membership && !!(currVal % 2);
    }
    if (membership % 2 && pastVal > 1) {
      return pastVal <= membership && !!(pastVal % 2);
    }

    // Check if persistent only
    if (currVal > 1) return 2 * Math.floor(currVal / 2) <= membership;
    if (pastVal > 1) return 2 * Math.floor(pastVal / 2) <= membership;
  };

  replaceCurrent = (at: number[], membership: dtstr.ValidMemberships) => {
    this.current.replace(at, membership);
    this.notifyAll("replaceCurrent");
  };

  // Merge current into past
  mergeCurrent = () => {
    this.past.merge(this.current);
    this.notifyAll("mergeCurrent");
  };

  // Clears transient selection from past & replaces current with past
  clearCurrent = () => {
    this.past = this.past.floorToEvens();
    this.current = new MembershipArray2([...this.past]);
  };

  clearAll = () => {
    this.current.clear();
    this.past.clear();
  };
}

export class MembershipArray2 extends Uint8Array {
  clear = () => this.fill(0);

  // Floors values at even numbers (i.e. clears transient selection)
  floorToEvens = () => {
    return new MembershipArray2(this.map((e) => 2 * Math.floor(e / 2)));
  };

  merge = (arr: MembershipArray2) => {
    let i = this.length;
    while (i--) {
      if (arr[i] === 0) continue;
      this[i] = arr[i];
    }
  };

  replace = (at: number[], membership: any) => {
    let i = at.length;
    if (membership === 1) {
      // If membership is 1 (transient), increments idempotently by 1
      while (i--) this[at[i]] = 2 * Math.floor(this[at[i]] / 2) + 1;
      return;
    }
    // Otherwise just replaces
    while (i--) this[at[i]] = membership;
  };

  clearAndReplace = (at: number[], membership: dtstr.ValidMemberships) => {
    this.clear();
    this.replace(at, membership);
  };
}

const mm1 = new MarkerHandler2(10);

mm1.replaceCurrent([1, 2, 3], 2);
mm1.replaceCurrent([3, 4, 5], 4);
mm1.replaceCurrent([0, 1, 4], 1);
mm1.replaceCurrent([0, 1, 4], 1);
//mm1.mergeCurrent();
//console.log([...mm1.current]);
//console.log([...mm1.past]);

//console.log(mm1.isOfMembership(4, 1));
