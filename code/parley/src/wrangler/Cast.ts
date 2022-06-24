import * as dtstr from "../datastructures.js";
import * as funs from "../functions.js";
import { Marker } from "../marker/Marker.js";

export class Cast {
  vector: dtstr.VectorGeneric;
  marker: Marker;
  indices: number[];
  allUnique: boolean;
  selected: number[];
  fun: Function;
  args: any[];
  withinFun: Function;
  withinArgs: any[];
  acrossFun: Function;
  acrossArgs: any[];

  constructor(vector: dtstr.VectorGeneric) {
    this.vector = vector;
    this.marker = null;
    this.indices = null;
    this.allUnique = false;
    this.acrossFun = funs.identity;
    this.acrossArgs = [];
    this.withinFun = funs.identity;
    this.withinArgs = [];
  }

  get uniqueIndices() {
    return Array.from(new Set(this.indices));
  }

  get acrossVec() {
    return this.acrossFun(this.vector, ...this.acrossArgs);
  }

  get defaultSplit() {
    const { acrossVec, indices, uniqueIndices } = this;

    // Split vector array into sub-arrays based on indices
    const res = uniqueIndices.map((uniqueIndex) =>
      indices.flatMap((index, i) => (index === uniqueIndex ? acrossVec[i] : []))
    );
    return res;
  }

  get selectedSplit() {
    const { acrossVec, indices, uniqueIndices, marker } = this;

    const res = uniqueIndices.map((uniqueIndex) =>
      indices.flatMap((index, i) =>
        index === uniqueIndex && marker.selected[i] ? acrossVec[i] : []
      )
    );
    return res;
  }

  extract = (type?: "selected") => {
    const { allUnique } = this;

    if (type === "selected") {
      // Skip data-splitting if every datapoint has a unique representation
      if (allUnique)
        return this.acrossVec.filter((_, i) => this.marker.selected[i]);

      const res = this.selectedSplit
        .filter((e) => e.length > 0)
        .flatMap((e) => this.withinFun(e, ...this.withinArgs));
      return res;
    }

    if (allUnique) return this.vector; // Ditto: skip data-splitting

    const res = this.defaultSplit
      .filter((e) => e.length > 0)
      .flatMap((e) => this.withinFun(e, ...this.withinArgs));

    return res;
  };

  registerAcross = (fun: Function, ...args: any[]) => {
    this.acrossFun = fun;
    this.acrossArgs = args;
    return this;
  };

  registerWithin = (fun: Function, ...args: any[]) => {
    this.withinFun = fun;
    this.withinArgs = args;
    return this;
  };

  registerFun = (fun: Function, ...args: any[]) => {
    this.fun = fun;
    this.args = args;
    return this;
  };
}
