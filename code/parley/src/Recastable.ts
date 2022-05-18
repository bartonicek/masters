import * as dtstr from "./datastructures.js";

export class Recastable {
  data: dtstr.VectorGeneric;
  indices: number[];
  uniqueIndices: number[];
  selected: number[];
  fun: Function;

  constructor(
    data: dtstr.VectorGeneric,
    indices: number[],
    selected: number[],
    fun: Function
  ) {
    this.data = data;
    this.indices = indices;
    this.uniqueIndices = Array.from(new Set(indices));
    this.selected = selected;
    this.fun = fun;
  }

  get defaultSplit() {
    const { data, indices, uniqueIndices } = this;
    return uniqueIndices.map((uniqueIndex) =>
      indices
        .flatMap((index, position) => (index === uniqueIndex ? position : []))
        .map((index) => data[index])
    );
  }

  get selectedSplit() {
    const { data, indices, uniqueIndices, selected } = this;
    return uniqueIndices.map((uniqueIndex) =>
      indices
        .flatMap((index, position) =>
          index === uniqueIndex && selected[position] ? position : []
        )
        .map((index) => data[index])
    );
  }
}
