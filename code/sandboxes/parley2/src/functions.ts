import * as datastr from "./datastructures.js";

const isNumeric = (x: datastr.VectorGeneric) => typeof x[0] === "number";
const sum = (x: number[]) => x.reduce((a, b) => a + b);
const mean = (x: number[]) => x.reduce((a, b) => a + b) / x.length;
const min = (x: number[]) => Math.min(...x);
const max = (x: number[]) => Math.max(...x);

const which = (x: datastr.VectorGeneric, value) => {
  return Array.from(x.keys()).filter((e, i) => x[i] === value);
};

const unique = (x: datastr.VectorGeneric) => {
  return Array.from(new Set(x));
};

export { isNumeric, sum, mean, min, max, unique, which };
