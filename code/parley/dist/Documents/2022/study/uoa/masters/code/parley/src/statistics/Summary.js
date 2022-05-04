export class Summary {
    x;
    y;
    constructor(data, mapping, functions = ["mean"], across = "x") {
        const [x, y] = [
            data[mapping.get(across)],
            data[mapping.get(across === "x" ? "y" : "x")],
        ];
    }
}
const summary = (data, mapping, functions = ["sum"], across = "x") => {
    const [x, y] = [
        data[mapping.get(across)],
        data[mapping.get(across === "x" ? "y" : "x")],
    ];
    const xu = funs.unique(x);
    const xi = xu.map((e) => funs.which(x, e));
    const self = {
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
