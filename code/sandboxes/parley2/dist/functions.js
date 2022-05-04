const isNumeric = (x) => typeof x[0] === "number";
const sum = (x) => x.reduce((a, b) => a + b);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
const min = (x) => Math.min(...x);
const max = (x) => Math.max(...x);
const which = (x, value) => {
    return Array.from(x.keys()).filter((e, i) => x[i] === value);
};
const unique = (x) => {
    return Array.from(new Set(x));
};
export { isNumeric, sum, mean, min, max, unique, which };
