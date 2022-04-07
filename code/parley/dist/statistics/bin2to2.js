class Bin2to2 {
    x;
    y;
    constructor(data, mapping, binAxis = "x", trans = "mean") {
        this.x = data[mapping.get("x")];
        this.y = data[mapping.get("y")];
    }
    // For each unique x, computes the mean of y's
    mean(x, y) {
        const uniqueX = Array.from(new Set(x));
        uniqueX.map((x) => {
            y.filter((y, i) => x[i] === x).reduce((a, b) => a + b);
        });
    }
}
