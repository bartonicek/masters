import { Plot } from "./plot.js";
import { Scene } from "./scene.js";

const n = 100
const height = Array.from(Array(n))
               .map(e => Math.round(Math.random() * 20))
const weight = Array.from(Array(n)).map(e => Math.random() * 20)
const data1 = {n, height, weight}
const mapping1 = new Map([
    ["x", "height"],
    ["y", "weight"]
])

const mappings = {mapping1}

const scene1 = new Scene(data1, mappings)
