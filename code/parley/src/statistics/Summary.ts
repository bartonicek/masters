// import * as datastr from "../datastructures.js";
// import * as funs from "../functions.js";

// export class Summary {
//   x: datastr.VectorGeneric;
//   y: number[];
//   indices: number[];

//   constructor(
//     data: datastr.DataFrame,
//     mapping: datastr.Mapping,
//     functions = ["mean"],
//     across = "x"
//   ) {
//     const [x, y] = [
//       data[mapping.get(across)],
//       data[mapping.get(across === "x" ? "y" : "x")],
//     ];

//     this.x = funs.unique(x);
//     this.indices = funs.match(x, this.x);

//     // Apply summarizing function(s) to either get a single y
//     // or multiple y's, indexed by a number
//     functions.length === 1
//       ? (this.y = this.x.map((e, i) => {
//           return funs[functions[0]](y.filter((f, j) => this.indices[j] === i));
//         }))
//       : functions.forEach((fun, i) => {
//           this[`y${i}`] = this.x.map((e, i) => {
//             return funs[fun](y.filter((f, j) => this.indices[j] === i));
//           });
//         });
//   }
// }
