export class Scale {
    data;
    length;
    direction;
    expand;
    offset;
    constructor(length, direction = 1, expand = 0.1) {
        this.length = length;
        this.direction = direction;
        this.expand = expand;
        this.offset = this.direction === -1 ? this.length : 0;
    }
    registerData = (data) => {
        this.data = data;
    };
    pctToUnits = (pct) => {
        const { length, offset, direction } = this;
        return typeof pct === "number"
            ? offset + direction * length * pct
            : pct.map((e) => offset + direction * length * e);
    };
    unitsToPct = (units) => {
        const { length } = this;
        return typeof units === "number"
            ? units / length
            : units.map((e) => e / length);
    };
}
