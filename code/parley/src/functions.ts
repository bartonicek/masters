import * as trans from "./transformations.js";

// Functions can return output of a different length than input (e.g. sum, mean, quantiles)

const isNumeric = (x: (number | string | boolean)[]) => {
  return typeof x[0] === "number";
};
const sum = (x: number[]) => x.reduce((a, b) => a + b);
const mean = (x: number[]) => x.reduce((a, b) => a + b) / x.length;
const min = (x: number[]) => Math.min(...x);
const max = (x: number[]) => Math.max(...x);

const unique = (x: (number | string | boolean)[]) => {
  return Array.from(new Set(trans.sort(x)));
};

// Sort x, count the number of each unique value
const tabulate = (x: (number | string | boolean)[]) => {
  trans.sort(x);
  const tab = x.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
  return { values: [...tab.keys()], counts: [...tab.values()] };
};

//For each unique value of x, apply function to all corresponding y's
const tabulate2 = (
  x: (number | string | boolean)[],
  y: number[],
  fun: Function
) => {
  const xu = unique(x);
  return xu.map((e) => fun(y.filter((f, i) => x[i] == e)));
};

export { isNumeric, sum, mean, min, max, unique, tabulate, tabulate2 };
