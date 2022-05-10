export class Wrangler {
    data;
    mapping;
    by;
    what;
    combinations;
    indices;
    constructor(data, mapping) {
        this.data = data;
        this.mapping = mapping;
        this.by = new Set();
        this.combinations = [""];
    }
    splitBy = (...args) => {
        //arg.forEach((arg) => this.by.add(arg)); // Add variables to set of splitting variables
        // this[`${by}_unique`] = funs.unique(this.data[this.mapping.get(by)]);
        // this.combinations = this[`${by}_unique`].flatMap((e) =>
        //   this.combinations.map((f) => [e, ...f])
        // );
        //this.indices = funs.match(this.data[this.mapping.get(by)], this[by]);
        // this.what = by === "x" ? "y" : "x"; // Variable to be split
        // this[this.what] = this[by].map((e, i) => {
        //   return this.data[this.mapping.get(this.what)].filter((f, j) => {
        //     return this.indices[j] === i;
        //   });
        // });
        return this;
    };
}
