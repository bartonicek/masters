import * as funs from "./functions.js";
// Transformations are 1-to-1 functions, meaning that they return output
// of the same length as input. For now, they can only act on numeric inputs
const sort = (x) => {
    return funs.isNumeric(x) ? x.sort((a, b) => a - b) : x.sort();
};
const identity = (x) => x;
const log = (x) => x.map((e) => Math.log(e));
const log1p = (x) => x.map((e) => Math.log(e + 1));
export { sort, identity, log, log1p };
