/* (c) Crown Copyright GCHQ */

import { get } from 'svelte/store';
import { settings } from './settings.store';

describe('settings', () => {
	it('has some sensible defaults', () => {
		expect(Object.keys(get(settings))).not.toHaveLength(0);
	});
});
