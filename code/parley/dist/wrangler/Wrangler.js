import * as funs from "../functions.js";
import { Cast } from "./Cast.js";
export class Wrangler {
    data;
    mapping;
    marker;
    by;
    what;
    indices;
    x;
    y;
    constructor(data, mapping, marker) {
        this.data = data;
        this.mapping = mapping;
        this.marker = marker;
        this.indices = [];
        this.by = new Set();
        this.what = new Set();
    }
    getMapping = (mapping) => {
        return this.data[this.mapping.get(mapping)];
    };
    extractAsIs = (...mappings) => {
        this.indices = Array.from(Array(this.marker.n), (e, i) => i);
        mappings.forEach((mapping) => {
            this[mapping] = new Cast(this.getMapping(mapping)).registerFun(funs.identity);
            this[mapping].marker = this.marker;
            this[mapping].allUnique = true;
        });
        return this;
    };
    splitBy = (...mappings) => {
        mappings.forEach((mapping, i) => {
            this.by.add(mapping);
            this[mapping] = new Cast(this.getMapping(mapping));
            this[mapping].marker = this.marker;
        });
        return this;
    };
    splitWhat = (...mappings) => {
        mappings.forEach((mapping) => {
            this.what.add(mapping);
            this[mapping] = new Cast(this.getMapping(mapping));
            this[mapping].marker = this.marker;
        });
        return this;
    };
    doOn = (fun, ...args) => {
        Array.from(this.by).forEach((mapping) => this[mapping].registerFun(fun, ...args));
        const splittingVars = Array.from(this.by).map((e) => this[e].vector);
        this.indices = funs.uniqueRowIds(splittingVars);
        Array.from(this.by).forEach((mapping) => {
            this[mapping].indices = this.indices;
        });
        return this;
    };
    doWithin = (fun, ...args) => {
        Array.from(this.what).forEach((mapping) => {
            this[mapping].registerFun(fun, ...args);
            this[mapping].indices = this.indices;
        });
        return this;
    };
}
