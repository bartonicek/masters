const isNumeric = (x) => typeof x[0] === "number";
const sum = (x) => x.reduce((a, b) => a + b);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
const min = (x) => Math.min(...x);
const max = (x) => Math.max(...x);
const which = (x, value) => {
    return x.map((e, i) => (e === value ? i : NaN)).filter((e) => !isNaN(e));
};
const match = (x, values) => {
    return x.map((e) => values.indexOf(e));
};
const unique = (x) => {
    return x.filter((e, i) => x.indexOf(e) == i);
};
export { isNumeric, sum, mean, min, max, which, match, unique };
