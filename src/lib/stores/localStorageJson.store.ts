/* (c) Crown Copyright GCHQ */

import { retrieveJSONObject, storeJSONObject } from '$lib/util/localStorage.utils';
import { namespace } from '$lib/constants';
import { writable } from 'svelte/store';

/**
 *
 * @param key storage key to use
 * @param defaultValue value to use if no value exists already
 * @returns
 */
export function createLocalStorageJSONStore<T>(key: string, defaultValue: T) {
	const namespacedKey = `${namespace}${key}`;

	const { set, subscribe, update } = writable<T>({
		...defaultValue,
		...retrieveJSONObject(namespacedKey)
	});

	subscribe((store) => {
		storeJSONObject<T>(namespacedKey, store);
	});

	return {
		restore() {
			set(defaultValue);
		},
		subscribe,
		update
	};
}
