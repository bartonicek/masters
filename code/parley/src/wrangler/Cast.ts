import * as dtstr from "../datastructures.js";
import { Marker } from "../marker/Marker.js";

export class Cast {
  vector: dtstr.VectorGeneric;
  marker: Marker;
  indices: number[];
  uniqueIndices: number[];
  selected: number[];
  fun: Function;
  args: any[];

  constructor(
    vector: dtstr.VectorGeneric,
    wrangler: { indices: number[]; marker: Marker }
  ) {
    this.vector = vector;
    this.marker = wrangler.marker;
    this.indices = wrangler.indices;
    this.uniqueIndices = Array.from(new Set(this.indices));
  }

  get defaultSplit() {
    const { vector, indices, uniqueIndices } = this;
    return uniqueIndices.map((uniqueIndex) =>
      indices
        .flatMap((index, position) => (index === uniqueIndex ? position : []))
        .map((index) => vector[index])
    );
  }

  get selectedSplit() {
    const { vector, indices, uniqueIndices, marker } = this;
    return uniqueIndices.map((uniqueIndex) =>
      indices
        .flatMap((index, position) =>
          index === uniqueIndex && marker.selected[position] ? position : []
        )
        .map((index) => vector[index])
    );
  }

  extract = (type?: "selected") => {
    if (type === "selected") {
      return this.selectedSplit.map((e) => this.fun(e, ...this.args));
    }
    return this.defaultSplit.flatMap((e) => this.fun(e, ...this.args));
  };

  registerFun = (fun: Function, ...args: any[]) => {
    this.fun = fun;
    this.args = args;
    return this;
  };
}
