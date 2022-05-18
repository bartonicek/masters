export class Recastable {
    data;
    indices;
    selected;
    constructor(data, indices, selected) {
        this.data = data;
        this.indices = indices;
        this.selected = selected;
    }
    get splitData() {
        return Array.from(new Set(this.indices)).map((uniqueIndex) => this.indices
            .flatMap((f, j) => (f === uniqueIndex ? j : []))
            .map((g) => this.data[g]));
    }
}
