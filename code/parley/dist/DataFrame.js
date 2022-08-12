export class DataFrame {
    constructor(data) {
        Object.keys(data).forEach((e) => (this[e] = data[e]));
    }
    static getData = async (path) => {
        const response = await fetch(path);
        return new DataFrame(await response.json());
    };
    get n() {
        return this[Object.keys(this)[0]].length;
    }
    get _indicator() {
        return Array(this.n).fill(1);
    }
}
