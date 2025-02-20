/* (c) Crown Copyright GCHQ */

import { decorateSourceStore, generateId } from '$lib/util/source.util';
import { derived, writable } from 'svelte/store';
import type { Source, QuerySources } from './sources.store';

export interface RemoteSource extends Source {
	type: 'REMOTE';
	url: string;
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
	// TODO: Comunica tries to auto-detect the nature and querying capabilities of remote sources by
	// sending off exploratory requests to endpoints etc.
	//
	// To improve performance,  we could expose "remote source type"  as an option to users rather
	// than always defaulting to auto detect. In our sources catalog, for example, we know the
	// DBPedia SPARQL endpoint is and will always be a SPARQL endpoint.
	($sources) => $sources.filter((s) => s.enabled).map((s) => s.url) as QuerySources
);
