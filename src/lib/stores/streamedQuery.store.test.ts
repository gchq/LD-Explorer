/* (c) Crown Copyright GCHQ */

import { type StreamedQuery, createQueryStore } from './streamedQuery.store';
import { sourceList, sources } from '$lib/stores/sources/local-sources.store';
import type { Bindings } from '@comunica/types';
import type { MockInstance } from 'vitest';
import type { Quad } from '@rdfjs/types';
import { QueryStatus } from '$lib/types';
import { get } from 'svelte/store';
import { importRdfDocument } from '$lib/util/source.util';
import { logger } from '$stores/logger.store';

const document = `
PREFIX : <http://www.example.com/> 
:Bob :name "Bob" .
:Alice :name "Alice" .
:Alice :knows :Bob .
`;

interface StreamedQueryTestContext {
	result: StreamedQuery;
	quadsResult: Quad[];
	bindingsResult: Bindings[];
}

// `injectQueryResultIntoContext` is a helper to use in `beforeEach` blocks for these tests. It
//  essentially just runs the passed in query against the current sources and injects the results
//  into the test context (as `result`) to allow them to be accessed within each test.
const injectQueryResultIntoContext =
	(query: string, expectedStatus = QueryStatus.Done) =>
	(context: StreamedQueryTestContext) =>
		new Promise<void>((done) => {
			const queryStore = createQueryStore(query, get(sourceList));

			queryStore.subscribe((result) => {
				if (result.status == expectedStatus) {
					context.result = result;
					done();
				}
			});
		});

describe(createQueryStore, () => {
	beforeAll(() => {
		sources.addSource({
			id: '',
			type: 'LOCAL',
			n3Store: undefined,
			name: 'Test source',
			description: 'Test sorce description',
			enabled: true
		});
		const source = get(sources)[0];
		importRdfDocument(source, document);
	});

	afterAll(() => {
		sources.removeAll();
	});

	describe('when running any query', () => {
		it('Starts off with a status of initialized', () => {
			const queryStore = createQueryStore('SELECT * WHERE { ?s ?p ?o } LIMIT 100', get(sourceList));
			expect(get(queryStore).status).toEqual(QueryStatus.Initialized);
		});
	});

	describe('when running a SELECT query', () => {
		const query = 'SELECT * WHERE { ?s ?p ?o }';

		beforeEach(injectQueryResultIntoContext(query));

		it<StreamedQueryTestContext>('returns the correct variables', ({ result }) => {
			expect(result.variables).toEqual(new Set(['s', 'p', 'o']));
		});

		it<StreamedQueryTestContext>('is a "bindings" type query', ({ result }) => {
			expect(result.type).toEqual('bindings');
		});

		it<StreamedQueryTestContext>('includes the original query', ({ result }) => {
			expect(result.originalQuery).toEqual(query);
		});

		describe('returned query results', () => {
			let bindings: Bindings[];

			function getBindingValues(bindings: Bindings) {
				return {
					s: bindings.get('s'),
					p: bindings.get('p'),
					o: bindings.get('o')
				};
			}

			beforeEach<StreamedQueryTestContext>((context) => {
				bindings = context.result.results as Bindings[];
			});

			it('has returned three bindings sets', () => {
				expect(bindings).toHaveLength(3);
			});

			test('the first result is about Bob', () => {
				const { s, p, o } = getBindingValues(bindings[0]);
				expect(s?.value).toEqual('http://www.example.com/Bob');
				expect(p?.value).toEqual('http://www.example.com/name');
				expect(o?.value).toEqual('Bob');
			});

			test('the second result is about Alice', () => {
				const { s, p, o } = getBindingValues(bindings[1]);
				expect(s?.value).toEqual('http://www.example.com/Alice');
				expect(p?.value).toEqual('http://www.example.com/name');
				expect(o?.value).toEqual('Alice');
			});

			test('the third result is about Alice and Bobs relationship', () => {
				const { s, p, o } = getBindingValues(bindings[2]);
				expect(s?.value).toEqual('http://www.example.com/Alice');
				expect(p?.value).toEqual('http://www.example.com/knows');
				expect(o?.value).toEqual('http://www.example.com/Bob');
			});
		});
	});

	describe('when running a DESCRIBE query', () => {
		const query = 'DESCRIBE <http://www.example.com/Bob>';

		beforeEach(injectQueryResultIntoContext(query));

		it<StreamedQueryTestContext>('is a "quads" type query', ({ result }) => {
			expect(result.type).toEqual('quads');
		});

		it<StreamedQueryTestContext>('includes the original query', ({ result }) => {
			expect(result.originalQuery).toEqual(query);
		});

		describe('returned query results', () => {
			let quads: Quad[];

			beforeEach<StreamedQueryTestContext>((context) => {
				quads = context.result.results as Quad[];
			});

			it('has returned only a single triple', () => {
				expect(quads).toHaveLength(1);
			});

			test('the triple contains details about Bob', () => {
				const quad = quads[0];

				// Subject
				expect(quad.subject.value).toEqual('http://www.example.com/Bob');
				expect(quad.predicate.value).toEqual('http://www.example.com/name');
				expect(quad.object.value).toEqual('Bob');
			});
		});
	});

	describe('when running a CONSTRUCT query', () => {
		const query = 'CONSTRUCT WHERE { ?s ?p ?o }';

		beforeEach(injectQueryResultIntoContext(query));

		it<StreamedQueryTestContext>('is a "quads" type query', ({ result }) => {
			expect(result.type).toEqual('quads');
		});

		it<StreamedQueryTestContext>('includes the original query', ({ result }) => {
			expect(result.originalQuery).toEqual(query);
		});

		describe('returned query results', () => {
			let quads: Quad[];

			beforeEach<StreamedQueryTestContext>((context) => {
				quads = context.result.results as Quad[];
			});

			it('has returned three triples', () => {
				expect(quads).toHaveLength(3);
			});

			test('the first triple contains details about Bob', () => {
				const quad = quads[0];

				expect(quad.subject.value).toEqual('http://www.example.com/Bob');
				expect(quad.predicate.value).toEqual('http://www.example.com/name');
				expect(quad.object.value).toEqual('Bob');
			});

			test('the second triple contains details about Alice', () => {
				const quad = quads[1];

				expect(quad.subject.value).toEqual('http://www.example.com/Alice');
				expect(quad.predicate.value).toEqual('http://www.example.com/name');
				expect(quad.object.value).toEqual('Alice');
			});

			test('the third triple contains details about Alice knowing Bob', () => {
				const quad = quads[2];

				expect(quad.subject.value).toEqual('http://www.example.com/Alice');
				expect(quad.predicate.value).toEqual('http://www.example.com/knows');
				expect(quad.object.value).toEqual('http://www.example.com/Bob');
			});
		});
	});

	describe('when running an ASK query', () => {
		const query = 'ASK { ?s ?p ?o }';

		beforeEach(injectQueryResultIntoContext(query));

		it<StreamedQueryTestContext>('is a "boolean" type query', ({ result }) => {
			expect(result.type).toEqual('boolean');
		});

		it<StreamedQueryTestContext>('includes the original query', ({ result }) => {
			expect(result.originalQuery).toEqual(query);
		});

		it<StreamedQueryTestContext>('returns only a single result', ({ result }) => {
			expect(result.results).toHaveLength(1);
		});

		it<StreamedQueryTestContext>('returns the correct boolean result', ({ result }) => {
			const boolean = result.results[0] as boolean;
			expect(boolean).toEqual(true);
		});
	});

	describe('when halting a query', () => {
		beforeEach((context: StreamedQueryTestContext) => {
			const queryStore = createQueryStore('SELECT * WHERE { ?s ?p ?o }', get(sourceList));
			queryStore.stop();
			context.result = get(queryStore);
		});

		it<StreamedQueryTestContext>('udpates the status to "HALTED"', ({ result }) => {
			expect(result.status).toEqual(QueryStatus.Halted);
		});
	});

	describe('when running an unsupported query type', () => {
		const query = 'INSERT DATA { <http://www.example.com/A> <http://www.example.com/B> "C" }';
		let loggerAdd: MockInstance;

		beforeEach(() => {
			loggerAdd = vi.spyOn(logger, 'addErrorMessage').mockImplementation(() => undefined);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		describe('updates the query correctly', () => {
			beforeEach(injectQueryResultIntoContext(query, QueryStatus.Error));

			it<StreamedQueryTestContext>('is a "void" type query', ({ result }) => {
				expect(result.type).toEqual('void');
			});

			it<StreamedQueryTestContext>('sets the status to Error', ({ result }) => {
				expect(result.status).toEqual(QueryStatus.Error);
			});
		});

		describe('logging', () => {
			it('writes an appropriate message to the logger', async () => {
				await new Promise<void>((resolve) => {
					const queryStore = createQueryStore(query, get(sourceList));

					queryStore.subscribe((result) => {
						if (result.status == QueryStatus.Error) {
							resolve();
						}
					});
				});
				expect(loggerAdd).toHaveBeenCalledWith(
					'Query',
					'Engine attempted to run an unsupported query',
					expect.objectContaining({ resultType: 'void', sparqlQuery: query })
				);
			});
		});
	});
});
