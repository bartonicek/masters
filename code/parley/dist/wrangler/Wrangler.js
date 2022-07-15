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
            this[mapping] = new Cast(this.getMapping(mapping));
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
    doAcross = (target, fun, ...args) => {
        if (target === "by" || target === "what") {
            Array.from(this[target]).forEach((mapping) => {
                this[mapping].registerAcross(fun, ...args);
            });
            return this;
        }
        this[target].registerAcross(fun, ...args);
        return this;
    };
    doWithin = (target, fun, ...args) => {
        if (target === "by" || target === "what") {
            Array.from(this[target]).forEach((mapping) => {
                this[mapping].registerWithin(fun, ...args);
            });
            return this;
        }
        this[target].registerWithin(fun, ...args);
        return this;
    };
    assignIndices = () => {
        const { what, by } = this;
        const splittingVars = Array.from(by).map((e) => this[e].acrossVec);
        this.indices = funs.uniqueRowIds(splittingVars);
        Array.from([...by, ...what]).map((e) => {
            this[e].indices = this.indices;
        });
        return this;
    };
}
