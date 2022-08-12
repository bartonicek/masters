import * as funs from "./functions.js";

export const globalParameters = {
  // Method to access deeply nested properties or their
  // fallback values up to n layers above if they can't be found
  accessUnpeel: function (...props: string[]) {
    return funs.accessUnpeel(this, ...props);
  },
  // Access indexed properties from property arrays, e.g.
  // all first elements
  accessIndexed: function (index: number, ...props: string[]) {
    const vals = this.accessUnpeel(this, ...props);
    const res = Object.keys(vals).map((e) => [e, vals[e][index]]);
    return Object.fromEntries(res);
  },

  bgCol: `ivory`,
  reps: {
    col: [`#cccccc`, `#1b9e77`],
    strokeCol: [null, null],
    strokeWidth: [null, null],
    radius: [5, 5],
  },
};
