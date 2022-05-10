import * as datastr from "./datastructures.js";

const isNumeric = (x: datastr.VectorGeneric) => typeof x[0] === "number";
const length = (x: datastr.VectorGeneric) => x.length;
const sum = (x: number[]) => x.reduce((a, b) => a + b);
const mean = (x: number[]) => x.reduce((a, b) => a + b) / x.length;
const min = (x: number[]) => Math.min(...x);
const max = (x: number[]) => Math.max(...x);

const quantile = (x: number[], q: number) => {
  const sorted = x.sort((a, b) => a - b);
  const pos = q * (sorted.length - 1);
  const lwr = Math.floor(pos);
  const uppr = Math.ceil(pos);
  return sorted[lwr] + (pos % 1) * (sorted[uppr] - sorted[lwr]);
};

const which = (x: datastr.VectorGeneric, value: any) => {
  return x.map((e, i) => (e === value ? i : NaN)).filter((e) => !isNaN(e));
};

const match = <Type>(x: Type[], values: Type[]): number[] | null => {
  return x.map((e) => values.indexOf(e));
};

const unique = <Type>(x: Type[]): Type[] | null => {
  return Array.from(new Set(x));
  //return x.filter((e, i) => x.indexOf(e) === i);    Slower
};

// arrEqual: Checks if two arrays are deeply equal
const arrEqual = (array1: any[], array2: any[]) => {
  return (
    array1.length == array2.length && array1.every((e, i) => e === array2[i])
  );
};

const arrTranspose = (data: any[][]) => {
  return data[0].map((_, i) => data.map((row) => row[i]));
};

// uniqueRows: Gets the unique rows & corresponding row ids of a dataframe
// (stored as an array of arrays/list of columns).
// Runs faster than a for loop, even though the rows are created twice
const uniqueRows = (data: any[][]) => {
  // Transpose dataframe from array of cols to array of rows & turn the rows into strings
  const stringDataT = data[0].map((_, i) =>
    JSON.stringify(data.map((row) => row[i]))
  );

  const stringValues = unique(stringDataT);
  const indices = match(stringDataT, stringValues);

  const values = unique(indices)
    .map((e) => stringDataT.indexOf(stringValues[e]))
    .map((e) => data.map((f) => f[e]));
  return { values, indices };
};

export {
  isNumeric,
  length,
  sum,
  mean,
  min,
  max,
  quantile,
  which,
  match,
  unique,
  arrEqual,
  arrTranspose,
  uniqueRows,
};
