import test from 'ava';
import { mean } from './../scripts/stats.js'

test('foo', t => {
	t.pass();
});

test('Mean of [1, 2, 3, 4] is 2.5', t => {
	const mu = mean([1, 2, 3, 4])
	t.is(mu, 2.5)
});
