export class Identity {
    x;
    y;
    constructor(data, mapping) {
        this.x = data[mapping.get("x")];
        this.y = data[mapping.get("y")];
    }
}
