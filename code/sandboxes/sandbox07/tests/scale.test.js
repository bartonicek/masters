import test from 'ava'
import { Scale } from './../scripts/scale.js'

const scale = new Scale(0, 100, 500, -1)

test('21 on a 500-units long reversed scale from 0 to 100 is 395', t => {
    const x = scale.dataToUnits(21)
    t.is(x, 395)     
})

