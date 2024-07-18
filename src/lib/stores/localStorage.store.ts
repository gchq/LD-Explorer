/* (c) Crown Copyright GCHQ */

import { getObject, setObject } from '$lib/util/storage.utils';
import { namespace } from '$lib/constants';
import { writable } from 'svelte/store';

export function createLocalStorageStore<T>(key: string, defaultStore: T) {
	const namespacedKey = `${namespace}${key}`;

	const { set, subscribe, update } = writable<T>(getObject(namespacedKey) || defaultStore);

	subscribe((store) => {
		setObject<T>(namespacedKey, store);
	});

	return {
		restore() {
			set(defaultStore);
		},
		subscribe,
		update
	};
}
