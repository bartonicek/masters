import * as dtstr from "../datastructures.js";
import * as funs from "../functions.js";
import { Marker } from "../marker/Marker.js";
import { Cast } from "./Cast.js";

export class Wrangler {
  data: dtstr.DataFrame;
  mapping: dtstr.Mapping;
  marker: Marker;
  by: Set<string>;
  what: Set<string>;
  indices: number[];
  x: Cast;
  y: Cast;

  constructor(data: dtstr.DataFrame, mapping: dtstr.Mapping, marker: Marker) {
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;
    this.indices = [];
    this.by = new Set();
    this.what = new Set();
  }

  getMapping = (mapping: dtstr.ValidMappings) => {
    return this.data[this.mapping.get(mapping)];
  };

  extractAsIs = (...mappings: dtstr.ValidMappings[]) => {
    this.indices = Array.from(Array(this.marker.n), (e, i) => i);
    mappings.forEach((mapping) => {
      this[mapping] = new Cast(this.getMapping(mapping)).registerFun(
        funs.identity
      );
      this[mapping].marker = this.marker;
      this[mapping].allUnique = true;
    });
    return this;
  };

  splitBy = (...mappings: dtstr.ValidMappings[]) => {
    mappings.forEach((mapping, i) => {
      this.by.add(mapping);
      this[mapping] = new Cast(this.getMapping(mapping));
      this[mapping].marker = this.marker;
    });
    return this;
  };

  splitWhat = (...mappings: dtstr.ValidMappings[]) => {
    mappings.forEach((mapping) => {
      this.what.add(mapping);
      this[mapping] = new Cast(this.getMapping(mapping));
      this[mapping].marker = this.marker;
    });
    return this;
  };

  doOn = (fun: Function, ...args: any[]) => {
    Array.from(this.by).forEach((mapping) =>
      this[mapping].registerFun(fun, ...args)
    );
    const splittingVars = Array.from(this.by).map((e) => this[e].vector);

    this.indices = funs.uniqueRowIds(splittingVars);
    Array.from(this.by).forEach((mapping) => {
      this[mapping].indices = this.indices;
    });
    return this;
  };

  doWithin = (fun: Function, ...args: any[]) => {
    Array.from(this.what).forEach((mapping) => {
      this[mapping].registerFun(fun, ...args);
      this[mapping].indices = this.indices;
    });
    return this;
  };
}
