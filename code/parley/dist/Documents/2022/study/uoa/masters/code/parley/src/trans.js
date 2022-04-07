const sort = (x) => { };
const identity = (x) => x;
const unique = (x) => {
    return Array.from(new Set(x.sort()));
};
const log = (x) => x.map((e) => Math.log(e));
const log1p = (x) => x.map((e) => Math.log(e + 1));
export { identity, unique, log, log1p };
