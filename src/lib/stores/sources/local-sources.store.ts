/* (c) Crown Copyright GCHQ */

import { decorateSourceStore, generateId } from '$lib/util/source.util';
import { derived, writable } from 'svelte/store';
import { Store as N3Store } from 'n3';
import type { Source } from './sources.store';
import type { QuerySources } from './sources.store';
import type { Store } from '@rdfjs/types';

export interface LocalSource extends Source {
	type: 'LOCAL';
	n3Store: Store | undefined;
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
	($sources) => $sources.filter((s) => s.enabled).map((s) => s.n3Store) as QuerySources
);
