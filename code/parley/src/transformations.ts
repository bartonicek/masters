import * as funs from "./functions.js";

// Transformations are 1-to-1 functions, meaning that they return output
// of the same length as input. For now, they can only act on numeric inputs

const sort = (x: (number | string | boolean)[]) => {
  return funs.isNumeric(x) ? x.sort((a: number, b: number) => a - b) : x.sort();
};

const identity = (x: (number | string | boolean)[]) => x;
const log = (x: number[]) => x.map((e) => Math.log(e));
const log1p = (x: number[]) => x.map((e) => Math.log(e + 1));

export { sort, identity, log, log1p };
