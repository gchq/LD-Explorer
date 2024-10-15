/* (c) Crown Copyright GCHQ */

/**
 * streamedQuery.store
 *
 * This is really the heart of the application and the main point that the user interface
 * and the query engine meet. The store is created with a SPARQL query and one or more
 * data source references, and then streams back the results as either...
 *
 * * A bindings stream - a stream of bindings (typically the result of a SELECT query)
 * * A quads stream - a stream of quads (typically the result of a CONSTUCT query)
 * * A boolean result - true or false (typically the result of an ASK query)
 *
 * For more information regarding bindings vs quads, see the RDFJS query specification
 *
 * https://rdf.js.org/query-spec/
 *
 * Broadly though - binding streams are like tables whereas quad streams are like graphs.
 */

import type { Bindings, BindingsStream } from '@comunica/types';
import { type Readable, writable } from 'svelte/store';
import { comunicaLogger, logger } from '$stores/logger.store';
import type { AsyncIterator } from 'asynciterator';
import type { Quad } from 'n3';
import { QueryStatus } from '$lib/types';
import type { QuerySources } from './sources/sources.store';
import type { ResultStream } from '@rdfjs/types';
import { engine } from '$lib/querying/engine';

type QuadsStream = AsyncIterator<Quad> & ResultStream<Quad>;
type QueryStream = BindingsStream | QuadsStream;
type QueryResult = boolean | Quad | Bindings;

export interface StreamedQuery {
	type?: 'bindings' | 'quads' | 'boolean' | 'void';
	originalQuery: string;
	variables: Set<string>;
	status: QueryStatus;
	results: QueryResult[];
}

export type StreamedQueryStore = Readable<StreamedQuery> & { stop: () => void };

function isBindings(r: QueryResult): r is Bindings {
	return (r as Bindings)?.type === 'bindings';
}

export function createQueryStore(sparqlQuery: string, sources: QuerySources): StreamedQueryStore {
	let queryStream: QueryStream | undefined = undefined;

	const { subscribe, update } = writable<StreamedQuery>(
		{
			originalQuery: sparqlQuery,
			status: QueryStatus.Initialized,
			results: [],
			variables: new Set()
		},
		() => {
			return () => {
				// Close down the binding stream when nobody subscribe end
				if (queryStream) queryStream.close();
			};
		}
	);

	(async function () {
		// User is attempting to run a query before they've added any data sources - abort
		if (!sources.length) {
			update((current) => ({ ...current, type: 'void', status: QueryStatus.Error }));
			return;
		}

		const result = await engine.query(sparqlQuery, {
			sources,
			readonly: true,
			lenient: true,
			log: comunicaLogger
		});

		// The engine will now have established the type of query, so we can update this
		update((current) => ({ ...current, type: result.resultType, status: QueryStatus.Fetching }));

		// Comunica engines can return one of three types of result based on the SPARQL query that
		// was run: bindings, quads or booleans.
		switch (result.resultType) {
			case 'bindings':
				// bindings are the result of SELECT queries and are basically tables.
				queryStream = await result.execute();
				break;
			case 'quads':
				// quads are the result of CONSTRUCT or DESCRIBE queries.
				queryStream = (await result.execute()) as unknown as QuadsStream;
				break;
			case 'boolean':
				// booleans are the result of ASK queries
				result.execute().then((booleanResult) => {
					update((current) => ({ ...current, results: [booleanResult], status: QueryStatus.Done }));
				});
				// Boolean results are not "streamed" like the other two, so we don't need to proceed once
				// we have this result, we can just return.
				return;
			default:
				update((current) => ({ ...current, status: QueryStatus.Error }));

				logger.addErrorMessage('Query', 'Engine attempted to run an unsupported query', {
					sparqlQuery,
					resultType: result.resultType
				});
				return;
		}

		// Note that ASK queries (which return a single boolean) will not be streamed, so this part
		// will only run for bindings or quad streams.
		if (queryStream) {
			// emitted when stream receives data
			queryStream.on('data', (r: QueryResult) => {
				update((current) => ({
					...current,
					results: [...current.results, r],
					// TODO: Variables are really only relevant with bindings-type queries. It's a bit
					// wasteful to include them / test for them for quad and boolean queries here as
					// well - should consider refactoring.
					variables: new Set<string>([
						...current.variables,
						...(isBindings(r) ? [...r.keys()].map((v) => v.value) : [])
					])
				}));
			});
			// emitted when stream ends
			queryStream.on('end', () => {
				update((current) => {
					// We only want to transition from "Fetching" to "Done". If the status has been updated
					// mid-fetch (e.g. to "Halted" or "Error") then we want to retain that status.
					if (current.status == QueryStatus.Fetching) {
						return { ...current, status: QueryStatus.Done };
					} else {
						return current;
					}
				});
			});
			// emitted when stream receives an error
			queryStream.on('error', (error: Error) => {
				update((current) => ({ ...current, status: QueryStatus.Error }));
				logger.addError('Query', error, {
					sparqlQuery,
					sourceCount: sources.length.toString()
				});
			});
		}
	})();

	return {
		subscribe,
		stop() {
			if (queryStream) queryStream.close();
			update((current) => ({ ...current, status: QueryStatus.Halted }));
		}
	};
}
