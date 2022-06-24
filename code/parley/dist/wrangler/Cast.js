import * as funs from "../functions.js";
export class Cast {
    vector;
    marker;
    indices;
    allUnique;
    selected;
    fun;
    args;
    withinFun;
    withinArgs;
    acrossFun;
    acrossArgs;
    constructor(vector) {
        this.vector = vector;
        this.marker = null;
        this.indices = null;
        this.allUnique = false;
        this.acrossFun = funs.identity;
        this.acrossArgs = [];
        this.withinFun = funs.identity;
        this.withinArgs = [];
    }
    get uniqueIndices() {
        return Array.from(new Set(this.indices));
    }
    get acrossVec() {
        return this.acrossFun(this.vector, ...this.acrossArgs);
    }
    get defaultSplit() {
        const { acrossVec, indices, uniqueIndices } = this;
        // Split vector array into sub-arrays based on indices
        const res = uniqueIndices.map((uniqueIndex) => indices.flatMap((index, i) => (index === uniqueIndex ? acrossVec[i] : [])));
        return res;
    }
    get selectedSplit() {
        const { acrossVec, indices, uniqueIndices, marker } = this;
        const res = uniqueIndices.map((uniqueIndex) => indices.flatMap((index, i) => index === uniqueIndex && marker.selected[i] ? acrossVec[i] : []));
        return res;
    }
    extract = (type) => {
        const { allUnique } = this;
        if (type === "selected") {
            // Skip data-splitting if every datapoint has a unique representation
            if (allUnique)
                return this.acrossVec.filter((_, i) => this.marker.selected[i]);
            const res = this.selectedSplit
                .filter((e) => e.length > 0)
                .flatMap((e) => this.withinFun(e, ...this.withinArgs));
            return res;
        }
        if (allUnique)
            return this.vector; // Ditto: skip data-splitting
        const res = this.defaultSplit
            .filter((e) => e.length > 0)
            .flatMap((e) => this.withinFun(e, ...this.withinArgs));
        return res;
    };
    registerAcross = (fun, ...args) => {
        this.acrossFun = fun;
        this.acrossArgs = args;
        return this;
    };
    registerWithin = (fun, ...args) => {
        this.withinFun = fun;
        this.withinArgs = args;
        return this;
    };
    registerFun = (fun, ...args) => {
        this.fun = fun;
        this.args = args;
        return this;
    };
}
