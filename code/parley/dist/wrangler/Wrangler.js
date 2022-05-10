import * as funs from "../functions.js";
export class Wrangler {
    data;
    mapping;
    by;
    what;
    combinations;
    entities;
    indices;
    constructor(data, mapping) {
        this.data = data;
        this.mapping = mapping;
        this.by = new Set();
        this.what = new Set();
    }
    getVar = (mapping) => {
        return this.data[this.mapping.get(mapping)];
    };
    extractIdentical = (...mappings) => {
        mappings.forEach((mapping) => {
            this[mapping] = this.data[this.mapping.get(mapping)];
        });
        return this;
    };
    splitBy = (...mappings) => {
        mappings.forEach((mapping) => this.by.add(mapping));
        const splitMappings = Array.from(this.by).map((e) => this.getVar(e));
        // Return unique combinations & indices
        const res = funs.uniqueRows(splitMappings);
        this.combinations = res.values;
        this.indices = res.indices;
        this.entities = funs.unique(this.indices).length;
        mappings.forEach((e, i) => (this[e] = this.combinations.map((f) => f[i])));
        return this;
    };
    splitWhat = (...mappings) => {
        mappings.forEach((variable) => this.what.add(variable));
        return this;
    };
    doWithin = (fun, ...args) => {
        Array.from(this.what).forEach((mapping) => {
            const varTemp = this.getVar(mapping);
            this[mapping] = this.combinations.map((_, i) => fun(varTemp.filter((_, j) => this.indices[j] === i), ...args));
        });
        return this;
    };
}
