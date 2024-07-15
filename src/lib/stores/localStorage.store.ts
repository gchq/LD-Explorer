/* (c) Crown Copyright GCHQ */

import { getObject, setObject } from '$lib/util/storage.utils';
import { writable } from 'svelte/store';

export function createLocalStorageStore<T>(key: string, defaultStore: T) {
	const { set, subscribe, update } = writable<T>(getObject(key) || defaultStore);

	subscribe((store) => {
		setObject<T>(key, store);
	});

	return {
		restore() {
			set(defaultStore);
		},
		subscribe,
		update
	};
}
