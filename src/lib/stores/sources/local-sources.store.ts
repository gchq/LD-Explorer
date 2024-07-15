/* (c) Crown Copyright GCHQ */

import { decorateSourceStore, generateId } from '$lib/util/source.util';
import { derived, writable } from 'svelte/store';
import type { IDataSource } from '@comunica/types';
import { Store as N3Store } from 'n3';
import type { Source } from './sources.store';

export interface LocalSource extends Source {
	type: 'LOCAL';
	n3Store: IDataSource | undefined;
}

const store = writable<LocalSource[]>([]);

export const sources = {
	...decorateSourceStore(store),
	addSource: (source: LocalSource) => {
		store.update((sources) => [
			...sources,
			{ ...source, id: generateId(), n3Store: new N3Store(), type: 'LOCAL' }
		]);
	}
};

export const sourceList = derived(
	sources,
	($sources) =>
		$sources.filter((s) => s.enabled).map((s) => s.n3Store) as [IDataSource, ...IDataSource[]]
);
