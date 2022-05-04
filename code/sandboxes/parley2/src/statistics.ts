import * as datastr from "./datastructures.js";
import * as funs from "./functions.js";

type Stat = {
  [key: string]: datastr.VectorGeneric | number[][];
  indices: number[][];
};

const identity = (data: datastr.DataFrame, mapping: datastr.Mapping) => {
  const [x, y] = [data[mapping.get("x")], data[mapping.get("y")]];
  return { indices: Array.from(Array(x.length), (e, i) => [i]), x, y };
};

const count = (data: datastr.DataFrame, mapping: datastr.Mapping) => {
  const [x] = [data[mapping.get("x")]];
  const xu = funs.unique(x);
  return {
    indices: xu.map((e) => funs.which(x, e)),
    x: xu,
    y: xu.map((e) => x.filter((f) => e === f).length),
  };
};

const summary = (
  data: datastr.DataFrame,
  mapping: datastr.Mapping,
  functions = ["sum"],
  across = "x"
) => {
  const [x, y] = [
    data[mapping.get(across)],
    data[mapping.get(across === "x" ? "y" : "x")],
  ];

  const xu = funs.unique(x);
  const xi = xu.map((e) => funs.which(x, e));

  const self: Stat = {
    indices: xi,
    x: xu,
  };

  if (functions.length === 1) {
    self.y = xu.map((f) => funs[functions[0]](y.filter((g, i) => f === x[i])));
    return self;
  }

  functions.forEach((e, i) => {
    self[`y${i}`] = xu.map((f) => funs[e](y.filter((g, i) => f === x[i])));
  });

  return self;
};

export { Stat, identity, count, summary };
