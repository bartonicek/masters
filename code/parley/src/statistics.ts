import * as trans from "./transformations.js";
import * as funs from "./functions.js";

const identity = (x: (number | string | boolean)[], tran = "identity") => {
  return funs.isNumeric(x) ? trans[tran](x) : x;
};

const unique = (x: (number | string | boolean)[], tran = "identity") => {
  return funs.isNumeric(x) ? funs.unique(trans[tran](x)) : funs.unique(x);
};

const count = (x: (number | string | boolean)[]) => {
  return funs.tabulate(x).counts;
};

const bin2 = (
  x: (number | string | boolean)[],
  y: number[],
  fun = "sum",
  tran = { x: "identity", y: "identity" }
) => {
  return funs.isNumeric(x)
    ? funs.tabulate2(trans[tran.x](x), trans[tran.y](y), funs[fun])
    : funs.tabulate2(x, trans[tran.y](y), funs[fun]);
};

export { identity, unique, count, bin2 };
