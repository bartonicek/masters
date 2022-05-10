const isNumeric = (x) => typeof x[0] === "number";
const length = (x) => x.length;
const sum = (x) => typeof x === "number" ? x : x.reduce((a, b) => a + b);
const mean = (x) => typeof x === "number" ? x : x.reduce((a, b) => a + b) / x.length;
const min = (x) => typeof x === "number" ? x : Math.min(...x);
const max = (x) => typeof x === "number" ? x : Math.max(...x);
const quantile = (x, q) => {
    if (typeof x === "number")
        return x;
    const sorted = x.sort((a, b) => a - b);
    const pos = typeof q === "number"
        ? q * (sorted.length - 1)
        : q.map((e) => e * (sorted.length - 1));
    const lwr = Math.floor(pos);
    const uppr = Math.ceil(pos);
    return sorted[lwr] + (pos % 1) * (sorted[uppr] - sorted[lwr]);
};
const which = (x, value) => {
    return x.map((e, i) => (e === value ? i : NaN)).filter((e) => !isNaN(e));
};
const match = (x, values) => {
    return x.map((e) => values.indexOf(e));
};
const unique = (x) => {
    return x.filter((e, i) => x.indexOf(e) == i);
};
export { isNumeric, length, sum, mean, min, max, quantile, which, match, unique, };
