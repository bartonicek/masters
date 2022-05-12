import * as funs from "../functions.js";
export class Wrangler {
    data;
    mapping;
    by;
    what;
    combinations;
    entities;
    indices;
    x;
    y;
    size;
    col;
    constructor(data, mapping) {
        this.data = data;
        this.mapping = mapping;
        this.by = new Set();
        this.what = new Set();
    }
    getMapping = (mapping) => {
        return this.data[this.mapping.get(mapping)];
    };
    extractAsIs = (...mappings) => {
        mappings.forEach((mapping) => {
            this[mapping] = this.data[this.mapping.get(mapping)];
        });
        this.indices = Array.from(Array(this[mappings[0]].length), (e, i) => [i]);
        return this;
    };
    splitBy = (...mappings) => {
        mappings.forEach((mapping) => this.by.add(mapping));
        const splitMappings = Array.from(this.by).map((e) => this.getMapping(e));
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
            const varTemp = this.getMapping(mapping);
            this[mapping] = this.combinations.map((_, i) => fun(varTemp.filter((_, j) => this.indices[i].indexOf(j) !== -1), ...args));
        });
        return this;
    };
}
