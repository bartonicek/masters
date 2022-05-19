export class Cast {
    vector;
    marker;
    indices;
    uniqueIndices;
    selected;
    fun;
    args;
    constructor(vector, wrangler) {
        this.vector = vector;
        this.marker = wrangler.marker;
        this.indices = wrangler.indices;
        this.uniqueIndices = Array.from(new Set(this.indices));
    }
    get defaultSplit() {
        const { vector, indices, uniqueIndices } = this;
        return uniqueIndices.map((uniqueIndex) => indices
            .flatMap((index, position) => (index === uniqueIndex ? position : []))
            .map((index) => vector[index]));
    }
    get selectedSplit() {
        const { vector, indices, uniqueIndices, marker } = this;
        return uniqueIndices.map((uniqueIndex) => indices
            .flatMap((index, position) => index === uniqueIndex && marker.selected[position] ? position : [])
            .map((index) => vector[index]));
    }
    extract = (type) => {
        if (type === "selected") {
            return this.selectedSplit.map((e) => this.fun(e, ...this.args));
        }
        return this.defaultSplit.flatMap((e) => this.fun(e, ...this.args));
    };
    registerFun = (fun, ...args) => {
        this.fun = fun;
        this.args = args;
        return this;
    };
}
