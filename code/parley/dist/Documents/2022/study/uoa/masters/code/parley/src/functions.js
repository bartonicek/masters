const isNumeric = (x) => typeof x[0] === "number";
const length = (x) => x.length;
const sum = (x) => x.reduce((a, b) => a + b, 0);
const mean = (x) => x.reduce((a, b) => a + b) / x.length;
const min = (x) => Math.min(...x);
const max = (x) => Math.max(...x);
const capitalize = (x) => {
    return typeof x === "string"
        ? x.charAt(0).toUpperCase() + x.slice(1)
        : x.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
};
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
const pointInRect = (point, // x, y
rect // x0, x1, y0, y1
) => {
    return ((point[0] - rect[0]) * (point[0] - rect[1]) < 0 &&
        (point[1] - rect[2]) * (point[1] - rect[3]) < 0);
};
const vecDiff = (x, y) => {
    return x.map((e, i) => e - y[i]);
};
// Function to test if point is inside polygon based on linear algebra.
// Hopefuly works. If not, try implementing the following:
// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
const insidePoly = (point, polygon, distance) => {
    const xmin = Math.min(...polygon.map((e) => e[0]));
    const ymin = Math.min(...polygon.map((e) => e[1]));
    const xmax = Math.max(...polygon.map((e) => e[0]));
    const ymax = Math.max(...polygon.map((e) => e[1]));
    if (point[0] < xmin ||
        point[0] > xmax ||
        point[1] < ymin ||
        point[1] > ymax) {
        return false;
    }
    const inds1 = Array.from(Array(polygon.length), (e, i) => i);
    const inds2 = Array.from(Array(polygon.length), (e, i) => i);
    inds2.shift();
    inds2.push(0);
    const sides = inds1.map((e, i) => vecDiff(polygon[inds2[i]], polygon[e]));
    const intersections = polygon.map((e, i) => {
        return [
            (point[1] - e[1]) / sides[i][1],
            ((point[1] - e[1]) / sides[i][1]) * sides[i][0] + e[0] - point[0],
        ];
    });
    const valid = intersections
        .map((e) => e[1])
        .filter((f) => f > 0 && f < distance);
    return valid.length % 2 === 1;
};
const timeExecution = (fun) => {
    const start = performance.now();
    fun();
    const end = performance.now();
    return end - start;
};
export { isNumeric, length, sum, mean, min, max, capitalize, quantile, which, match, unique, arrEqual, arrTranspose, uniqueRows, pointInRect, timeExecution, };