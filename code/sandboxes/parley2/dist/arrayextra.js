class NumArray extends Array {
    x;
    constructor(x) {
        super(...x.map(Number));
    }
}
class StrArray extends Array {
    x;
    constructor(x) {
        super(...x.map(String));
    }
}
class BoolArray extends Array {
    x;
    constructor(x) {
        super(...x.map(Boolean));
    }
}
export { NumArray, StrArray, BoolArray };
