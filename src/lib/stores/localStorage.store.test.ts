/* (c) Crown Copyright GCHQ */

import { createLocalStorageStore } from './localStorage.store';
import { get } from 'svelte/store';
import { namespace } from '$lib/constants';

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

		it('has not just written the key away with no namespace', () => {
			expect(JSON.parse(localStorage.getItem(exampleKey) || '""')).toBeFalsy();
		});

		it('Adds the store to localStorage with a namespace', () => {
			expect(JSON.parse(localStorage.getItem(`${namespace}${exampleKey}`) || '""')).toStrictEqual(
				exampleDefault
			);
		});
	});

	describe('On store update', () => {
		it('Updates localStorage accordingly, with a namespace', () => {
			const newSetting = { setting__biz: null };
			store.update((current) => ({ ...current, ...newSetting }));

			expect(JSON.parse(localStorage.getItem(`${namespace}${exampleKey}`) || '""')).toStrictEqual({
				...exampleDefault,
				...newSetting
			});
		});
	});

	describe('On restore', () => {
		it('Resets localStorage to the default initially provided', () => {
			const newSetting = { setting__biz: null };
			store.update((current) => ({ ...current, ...newSetting }));

			expect(
				JSON.parse(localStorage.getItem(`${namespace}${exampleKey}`) || '""')
			).not.toStrictEqual(exampleDefault);

			store.restore();
			expect(JSON.parse(localStorage.getItem(`${namespace}${exampleKey}`) || '""')).toStrictEqual(
				exampleDefault
			);
		});
	});
});
