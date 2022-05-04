import * as datastr from "../datastructures.js";

const isNumeric = (x: datastr.VectorGeneric) => typeof x[0] === "number";
const sum = (x: number[]) => x.reduce((a, b) => a + b);
const mean = (x: number[]) => x.reduce((a, b) => a + b) / x.length;
const min = (x: number[]) => Math.min(...x);
const max = (x: number[]) => Math.max(...x);

const which = (x: datastr.VectorGeneric, value: any) => {
  return x.map((e, i) => (e === value ? i : NaN)).filter((e) => !isNaN(e));
};

const match = (x: datastr.VectorGeneric, values: datastr.VectorGeneric) => {
  return x.map((e) => values.indexOf(e));
};

const unique = (x: datastr.VectorGeneric) => {
  return Array.from(new Set(x));
};

export { isNumeric, sum, mean, min, max, which, match, unique };
