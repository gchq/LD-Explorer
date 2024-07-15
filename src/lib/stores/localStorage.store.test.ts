/* (c) Crown Copyright GCHQ */

import { createLocalStorageStore } from './localStorage.store';
import { get } from 'svelte/store';

const exampleKey = 'test';
const exampleDefault = {
	setting__foo: 'fizz',
	setting__bar: 2,
	setting__baz: true
};

describe('localStorage store', () => {
	let store: ReturnType<typeof createLocalStorageStore<typeof exampleDefault>>;

	beforeEach(() => {
		localStorage.clear();
		store = createLocalStorageStore(exampleKey, exampleDefault);
	});

	describe(createLocalStorageStore, () => {
		it('Creates a store with a default value', () => {
			expect(get(store)).toStrictEqual(exampleDefault);
		});

		it('Adds the store to localStorage', () => {
			expect(JSON.parse(localStorage.getItem(exampleKey) || '""')).toStrictEqual(exampleDefault);
		});
	});

	describe('On store update', () => {
		it('Updates localStorage accordingly', () => {
			const newSetting = { setting__biz: null };
			store.update((current) => ({ ...current, ...newSetting }));

			expect(JSON.parse(localStorage.getItem(exampleKey) || '""')).toStrictEqual({
				...exampleDefault,
				...newSetting
			});
		});
	});

	describe('On restore', () => {
		it('Resets localStorage to the default initially provided', () => {
			const newSetting = { setting__biz: null };
			store.update((current) => ({ ...current, ...newSetting }));

			expect(JSON.parse(localStorage.getItem(exampleKey) || '""')).not.toStrictEqual(
				exampleDefault
			);

			store.restore();
			expect(JSON.parse(localStorage.getItem(exampleKey) || '""')).toStrictEqual(exampleDefault);
		});
	});
});
