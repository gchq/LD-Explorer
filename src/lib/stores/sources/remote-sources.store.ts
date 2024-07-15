/* (c) Crown Copyright GCHQ */

import { decorateSourceStore, generateId } from '$lib/util/source.util';
import { derived, writable } from 'svelte/store';
import type { IDataSource } from '@comunica/types';
import type { Source } from './sources.store';

export interface RemoteSource extends Source {
	type: 'REMOTE';
	url: IDataSource | string;
	fromCatalog?: boolean;
}

const store = writable<RemoteSource[]>([]);

export const sources = {
	...decorateSourceStore(store),
	addSource: (source: RemoteSource) => {
		store.update((sources) => [...sources, { ...source, id: generateId() }]);
	}
};

export const sourceList = derived(
	sources,
	($sources) =>
		$sources.filter((s) => s.enabled).map((s) => s.url) as [IDataSource, ...IDataSource[]]
);
