import * as dtstr from "../datastructures.js";
import { Marker } from "../marker/Marker.js";

export class Cast {
  vector: dtstr.VectorGeneric;
  marker: Marker;
  indices: number[];
  uniqueIndices: number[];
  allUnique: boolean;
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
    this.allUnique = false;
  }

  get defaultSplit() {
    const { vector, indices, uniqueIndices, allUnique } = this;

    // Split vector array into sub-arrays based on indices
    const res = uniqueIndices.map((uniqueIndex) =>
      indices.flatMap((index, i) => (index === uniqueIndex ? vector[i] : []))
    );

    return res;
  }

  get selectedSplit() {
    const { vector, indices, uniqueIndices, marker } = this;

    const res = uniqueIndices.map((uniqueIndex) =>
      indices.flatMap((index, i) =>
        index === uniqueIndex && marker.selected[i] ? vector[i] : []
      )
    );
    return res;
  }

  extract = (type?: "selected") => {
    const { allUnique } = this;

    if (type === "selected") {
      // Skip data-splitting if every datapoint has a unique representation
      if (allUnique)
        return this.vector.filter((_, i) => this.marker.selected[i]);

      const res = this.selectedSplit
        .filter((e) => e.length > 0)
        .flatMap((e) => this.fun(e, ...this.args));
      return res;
    }

    if (allUnique) return this.vector; // Ditto: skip data-splitting

    const res = this.defaultSplit
      .filter((e) => e.length > 0)
      .flatMap((e) => this.fun(e, ...this.args));

    return res;
  };

  registerFun = (fun: Function, ...args: any[]) => {
    this.fun = fun;
    this.args = args;
    return this;
  };
}
