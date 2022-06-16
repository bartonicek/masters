export class Cast {
    vector;
    marker;
    indices;
    uniqueIndices;
    allUnique;
    selected;
    fun;
    args;
    constructor(vector, wrangler) {
        this.vector = vector;
        this.marker = wrangler.marker;
        this.indices = wrangler.indices;
        this.uniqueIndices = Array.from(new Set(this.indices));
        this.allUnique = false;
    }
    get defaultSplit() {
        const { vector, indices, uniqueIndices, allUnique } = this;
        // Split vector array into sub-arrays based on indices
        const res = uniqueIndices.map((uniqueIndex) => indices.flatMap((index, i) => (index === uniqueIndex ? vector[i] : [])));
        return res;
    }
    get selectedSplit() {
        const { vector, indices, uniqueIndices, marker } = this;
        const res = uniqueIndices.map((uniqueIndex) => indices.flatMap((index, i) => index === uniqueIndex && marker.selected[i] ? vector[i] : []));
        return res;
    }
    extract = (type) => {
        const { allUnique } = this;
        if (type === "selected") {
            // Skip data-splitting if every datapoint has a unique representation
            if (allUnique)
                return this.vector.filter((_, i) => this.marker.selected[i]);
            const res = this.selectedSplit
                .filter((e) => e.length > 0)
                .flatMap((e) => this.fun(e, ...this.args));
            return res;
        }
        if (allUnique)
            return this.vector; // Ditto: skip data-splitting
        const res = this.defaultSplit
            .filter((e) => e.length > 0)
            .flatMap((e) => this.fun(e, ...this.args));
        return res;
    };
    registerFun = (fun, ...args) => {
        this.fun = fun;
        this.args = args;
        return this;
    };
}
