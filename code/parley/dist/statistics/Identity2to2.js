export class StatIdentity {
    statX;
    statY;
    constructor(data, mapping) {
        this.statX = data[mapping.get("x")];
        this.statY = data[mapping.get("y")];
    }
}
