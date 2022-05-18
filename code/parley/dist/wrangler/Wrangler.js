import * as funs from "../functions.js";
export class Wrangler {
    data;
    mapping;
    marker;
    by;
    what;
    combinations;
    entities;
    indices;
    x;
    y;
    size;
    col;
    constructor(data, mapping, marker) {
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
    getMapping = (mapping) => {
        return this.data[this.mapping.get(mapping)];
    };
    extractAsIs = (...mappings) => {
        mappings.forEach((mapping) => {
            this[mapping] = this.getMapping(mapping);
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
    subsetOnIndices = (x, indices) => {
        return indices.map((e) => x[e]);
    };
    doWithin = (fun, ...args) => {
        const compute = () => {
            Array.from(this.what).forEach((mapping) => {
                const temp = this.getMapping(mapping);
                this[mapping] = this.combinations.map((_, i) => fun(this.subsetOnIndices(temp, this.indices[i]), ...args));
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
