import * as datastr from "../datastructures.js";
import * as funs from "../functions.js";
import { Marker } from "../marker/Marker.js";

export class Wrangler {
  data: datastr.DataFrame;
  mapping: Map<string, string>;
  marker: Marker;
  by: Set<string>;
  what: Set<string>;
  combinations: any[];
  entities: number;
  indices: number[][];
  x: datastr.VectorGeneric;
  y: datastr.VectorGeneric;
  size: datastr.VectorGeneric;
  col: datastr.VectorGeneric;

  constructor(
    data: datastr.DataFrame,
    mapping: datastr.Mapping,
    marker: Marker
  ) {
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;
    this.by = new Set();
    this.what = new Set();
  }

  get selectedIndices() {
    return this.indices.map((e) => {
      return e.filter((f) => this.marker.selected.indexOf(f) !== -1);
    });
  }

  getMapping = (mapping: datastr.ValidMappings) => {
    return this.data[this.mapping.get(mapping)];
  };

  extractAsIs = (...mappings: datastr.ValidMappings[]) => {
    mappings.forEach((mapping) => {
      this[mapping] = this.getMapping(mapping);
    });
    this.indices = Array.from(Array(this[mappings[0]].length), (e, i) => [i]);
    return this;
  };

  splitBy = (...mappings: datastr.ValidMappings[]) => {
    mappings.forEach((mapping) => this.by.add(mapping));
    const splitMappings = Array.from(this.by).map((e: datastr.ValidMappings) =>
      this.getMapping(e)
    );

    // Return unique combinations & indices
    const res = funs.uniqueRows(splitMappings);

    this.combinations = res.values;
    this.indices = res.indices;
    this.entities = funs.unique(this.indices).length;

    mappings.forEach((e, i) => (this[e] = this.combinations.map((f) => f[i])));

    return this;
  };

  splitWhat = (...mappings: datastr.ValidMappings[]) => {
    mappings.forEach((variable) => this.what.add(variable));
    return this;
  };

  subsetOnIndices = (x: datastr.VectorGeneric, indices: number[]) => {
    return indices.map((e) => x[e]);
  };

  doWithin = (fun: Function, ...args: any[]) => {
    const compute = () => {
      Array.from(this.what).forEach((mapping: datastr.ValidMappings) => {
        const temp = this.getMapping(mapping);
        this[mapping] = this.combinations.map((_, i) =>
          fun(this.subsetOnIndices(temp, this.indices[i]), ...args)
        );
        // this[mapping + "Selected"] = this.combinations.map((_, i) =>
        //   fun(this.subsetOnIndices(temp, this.selectedIndices[i]), ...args)
        // );
      });
    };
    compute();
    this.marker.registerCallback(compute);
    return this;
  };
}
