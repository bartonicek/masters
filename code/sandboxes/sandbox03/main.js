
import { Plot } from "./plot.js";
import { Points } from "./points.js";
import { Scale } from "./scale.js";

const n = 10
const height = Array.from(Array(n))
               .map(e => Math.round(Math.random() * 20))
const weight = Array.from(Array(n)).map(e => Math.random() * 20)
const data1 = {height, weight}
const mapping1 = new Map([
    ["x", "height"],
    ["y", "weight"]
])

const plot1 = new Plot(data1, mapping1)
const scale1 = new Scale(0, 100, 500)
