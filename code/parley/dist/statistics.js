import * as trans from "./transformations.js";
import * as funs from "./functions.js";
const identity = (x, tran = "identity") => {
    return funs.isNumeric(x) ? trans[tran](x) : x;
};
const unique = (x, tran = "identity") => {
    return funs.isNumeric(x) ? funs.unique(trans[tran](x)) : funs.unique(x);
};
const count = (x) => {
    return funs.tabulate(x).counts;
};
const bin2 = (x, y, fun = "sum", tran = { x: "identity", y: "identity" }) => {
    return funs.isNumeric(x)
        ? funs.tabulate2(trans[tran.x](x), trans[tran.y](y), funs[fun])
        : funs.tabulate2(x, trans[tran.y](y), funs[fun]);
};
export { identity, unique, count, bin2 };
