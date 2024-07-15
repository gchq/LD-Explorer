/* (c) Crown Copyright GCHQ */

import { get } from 'svelte/store';
import { prefixes } from './prefixes.store';

describe('prefixes', () => {
	it('has some sensible defaults', () => {
		expect(Object.keys(get(prefixes))).not.toHaveLength(0);
	});
});
