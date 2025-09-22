/* (c) Crown Copyright GCHQ */

import type { QueryEngine } from '@comunica/query-sparql';

let engine: QueryEngine | null;

export async function createEngine(): Promise<QueryEngine> {
	if (!engine) {
		// Note the use of a lazy-loaded singleton here is to facilitate
		// dynamic import/code splitting of query-sparql, a very large package.
		const { QueryEngine } = await import('@comunica/query-sparql');
		engine = new QueryEngine();
	}
	return engine;
}
