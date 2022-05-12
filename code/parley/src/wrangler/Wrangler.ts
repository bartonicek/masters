import * as datastr from "../datastructures.js";
import * as funs from "../functions.js";

export class Wrangler {
  data: datastr.DataFrame;
  mapping: Map<string, string>;
  by: Set<string>;
  what: Set<string>;
  combinations: any[];
  entities: number;
  indices: number[][];
  x: datastr.VectorGeneric;
  y: datastr.VectorGeneric;
  size: datastr.VectorGeneric;
  col: datastr.VectorGeneric;

  constructor(data: datastr.DataFrame, mapping: datastr.Mapping) {
    this.data = data;
    this.mapping = mapping;
    this.by = new Set();
    this.what = new Set();
  }

  getMapping = (mapping: datastr.ValidMappings) => {
    return this.data[this.mapping.get(mapping)];
  };

  extractAsIs = (...mappings: datastr.ValidMappings[]) => {
    mappings.forEach((mapping) => {
      this[mapping] = this.data[this.mapping.get(mapping)];
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

  doWithin = (fun: Function, ...args: any[]) => {
    Array.from(this.what).forEach((mapping: datastr.ValidMappings) => {
      const varTemp = this.getMapping(mapping);
      this[mapping] = this.combinations.map((_, i) =>
        fun(
          varTemp.filter((_, j) => this.indices[i].indexOf(j) !== -1),
          ...args
        )
      );
    });
    return this;
  };
}
