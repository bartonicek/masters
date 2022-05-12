const isNumeric = (x) => typeof x[0] === "number";
const length = (x) => x.length;
const sum = (x) => x.reduce((a, b) => a + b);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
const min = (x) => Math.min(...x);
const max = (x) => Math.max(...x);
const quantile = (x, q) => {
    const sorted = x.sort((a, b) => a - b);
    if (typeof q === "number") {
        // For a single quantile
        const pos = q * (sorted.length - 1);
        const { lwr, uppr } = { lwr: Math.floor(pos), uppr: Math.ceil(pos) };
        return sorted[lwr] + (pos % 1) * (sorted[uppr] - sorted[lwr]);
    }
    else {
        // For multiple quantiles
        const pos = q.map((e) => e * (sorted.length - 1));
        const { lwr, uppr } = {
            lwr: pos.map((e) => Math.floor(e)),
            uppr: pos.map((e) => Math.ceil(e)),
        };
        return pos.map((e, i) => sorted[lwr[i]] + (e % 1) * (sorted[uppr[i]] - sorted[lwr[i]]));
    }
};
const which = (x, value) => {
    return x.map((e, i) => (e === value ? i : NaN)).filter((e) => !isNaN(e));
};
const match = (x, values) => {
    return x.map((e) => values.indexOf(e));
};
const unique = (x) => {
    return Array.from(new Set(x));
    //return x.filter((e, i) => x.indexOf(e) === i);    Slower
};
// arrEqual: Checks if two arrays are deeply equal
const arrEqual = (array1, array2) => {
    return (array1.length == array2.length && array1.every((e, i) => e === array2[i]));
};
const arrTranspose = (data) => {
    return data[0].map((_, i) => data.map((row) => row[i]));
};
// uniqueRows: Gets the unique rows & corresponding row ids of a dataframe
// (stored as an array of arrays/list of columns).
// Runs faster than a for loop, even though the rows are created twice
const uniqueRows = (data) => {
    // Transpose dataframe from array of cols to array of rows & turn the rows into strings
    const stringDataT = data[0].map((_, i) => JSON.stringify(data.map((row) => row[i])));
    const stringValues = unique(stringDataT);
    const indices = stringValues.map((e) => stringDataT.flatMap((f, j) => (f === e ? j : [])));
    const values = indices.map((e) => {
        return data.map((f) => f[e[0]]);
    });
    return { values, indices };
};
export { isNumeric, length, sum, mean, min, max, quantile, which, match, unique, arrEqual, arrTranspose, uniqueRows, };
