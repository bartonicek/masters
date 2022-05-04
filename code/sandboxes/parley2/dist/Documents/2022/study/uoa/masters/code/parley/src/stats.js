const sum = (x) => x.reduce((a, b) => a + b);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
const tabulate = (x) => {
    const tab = x
        .sort()
        .reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    return [...tab.values()];
};
// For each unique value of x, apply function to all corresponding y's
const tabulate2 = (x, y, fun) => {
    const xtab = Array.from(new Set(x));
    return xtab.map((e) => fun(y.filter((f, i) => x[i] == e)));
};
const statIdentity = (x, trans = "identity") => {
    return trans[trans](x);
};
const statIdentityD = (x) => {
    return x;
};
const statBin2 = (x, y, fun = mean, trans = identity) => {
    return tabulate2(x, trans(y), fun);
};
const statBin1 = (x, trans = sum) => { };
export {};
