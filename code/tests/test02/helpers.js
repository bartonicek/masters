
const vectorize = (x, length) => {
    return Array.from(Array(length), (e, i) => x[i % x.length])
}

export { vectorize }