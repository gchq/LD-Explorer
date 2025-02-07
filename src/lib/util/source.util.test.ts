/* (c) Crown Copyright GCHQ */

import { DataFactory, type Store as N3Store } from 'n3';
import { type LocalSource, sources } from '$lib/stores/sources/local-sources.store';
import {
	importJsonLDDocument,
	importQuads,
	importRdfDocument,
	importRdfaDocument
} from './source.util';
import { get } from 'svelte/store';

const { quad, namedNode, literal } = DataFactory;

const exampleLocalSource: LocalSource = {
	id: '',
	type: 'LOCAL',
	n3Store: undefined,
	name: 'Test source',
	description: 'Test sorce description',
	enabled: true
};

describe('data import functionality', () => {
	let source: LocalSource;
	let store: N3Store;

	beforeEach(() => {
		sources.addSource(exampleLocalSource);
		source = get(sources)[0];
		store = source.n3Store as N3Store;
	});

	afterEach(() => {
		sources.removeAll();
	});

	describe(importQuads, () => {
		it('allows you to import quads directly into a local source', () => {
			const triple1 = quad(namedNode('Bob'), namedNode('hasName'), literal('Bob'));
			const triple2 = quad(namedNode('Alice'), namedNode('hasName'), literal('Alice'));

			importQuads(source, [triple1, triple2]);

			expect(store.size).toEqual(2);
		});
	});

	describe(importRdfDocument, () => {
		it('allows you to import certain types of RDF document into local data sources', async () => {
			const document = `
            PREFIX : <http://www.example.com/>
            :Bob :name "Bob" .
            :Alice :name "Alice" .`;

			await importRdfDocument(source, document);

			expect(store.size).toEqual(2);
		});

		it('errors via promise rejection when the document is not formatted correctly', async () => {
			const document = `flobalob`;
			await expect(importRdfDocument(source, document)).rejects.toThrowError();
		});
	});

	describe(importRdfaDocument, () => {
		it('allows you to import an RDFa document into local data sources', async () => {
			const document = `
			<body vocab="http://www.example.com/" resource="http://www.example.com">
				<span property="name">Alice</span>
				<span property="name">Bob</span>
			</body>
			`;

			await importRdfaDocument(source, document);

			expect(store.size).toEqual(2);
		});
	});

	describe(importJsonLDDocument, () => {
		it('allows you to import JSONLD triples into local data sources', async () => {
			const document = JSON.stringify([
				{
					'@id': 'http://www.example.com/Alice',
					'http://www.example.com/name': [{ '@value': 'Alice' }]
				},
				{
					'@id': 'http://www.example.com/Bob',
					'http://www.example.com/name': [{ '@value': 'Bob' }]
				}
			]);

			await importJsonLDDocument(source, document);

			expect(store.size).toEqual(2);
		});
	});
});
