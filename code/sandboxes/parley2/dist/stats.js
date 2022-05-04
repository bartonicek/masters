import { NumArray } from "./datastructures.js";
const sum = (x) => x.reduce((a, b) => a + b);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
// Sort x, count the number of each unique value
const tabulate = (x) => {
    x instanceof NumArray ? x.sort((a, b) => a - b) : x.sort();
    const tab = x.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    return { values: [...tab.keys()], counts: [...tab.values()] };
};
// For each unique value of x, apply function to all corresponding y's
const tabulate2 = (x, y, fun) => {
    const xtab = Array.from(new Set(x));
    return xtab.map((e) => fun(y.filter((f, i) => x[i] == e)));
};
const statIdentity = (x, trans = "identity") => {
    // if (!(x instanceof NumArray) && trans != "identity") {
    //   throw "Cannot transform discrete variables";
    // }
    return x instanceof NumArray ? x.map((e) => e + 1) : x;
};
// const statBin2 = (
//   x: (number | string | boolean)[],
//   y: number[],
//   fun = mean,
//   trans = identity
// ) => {
//   return tabulate2(x, trans(y), fun);
// };
const statBin1 = (x, trans = sum) => { };
export { tabulate, statIdentity };
