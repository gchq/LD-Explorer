/* (c) Crown Copyright GCHQ */

import { Parser as N3Parser, type Store as N3Store, type Quad } from 'n3';
import { JsonLdParser } from 'jsonld-streaming-parser';
import type { LocalSource } from '$lib/stores/sources/local-sources.store';
import { RdfaParser } from 'rdfa-streaming-parser';
import type { Source } from '$stores/sources/sources.store';
import type { Writable } from 'svelte/store';
import { logger } from '$stores/logger.store';
import { v4 as uuid } from 'uuid';

function applyStreamingParser(
	source: LocalSource,
	document: string,
	parser: JsonLdParser | RdfaParser
): Promise<void> {
	return new Promise((resolve, reject) => {
		const store: N3Store = source.n3Store as N3Store;
		parser.on('data', (quad: Quad) => store.addQuad(quad));
		parser.on('error', reject);
		parser.on('end', resolve);

		parser.write(document);
		parser.end();
	});
}

// Import an array of quads into a local source
export async function importQuads(source: LocalSource, quads: Quad[]) {
	const store: N3Store = source.n3Store as N3Store;
	store.addQuads(quads);
}

// Import a single RDF document into a local source
export async function importRdfDocument(source: LocalSource, document: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const store: N3Store = source.n3Store as N3Store;
		const parser = new N3Parser();
		parser.parse(document, (error, quad, prefixes) => {
			if (error) reject(error);
			else {
				if (quad) store.addQuad(quad);
				else {
					logger.addInfo('RDF Document Import', 'Finished importing document', {
						prefixes: JSON.stringify(prefixes)
					});
					return resolve();
				}
			}
		});
	});
}

// Import a single RDFa document into a local source
export async function importRdfaDocument(source: LocalSource, document: string): Promise<void> {
	return applyStreamingParser(source, document, new RdfaParser());
}

// import a single JSONLD document into a local source
export async function importJsonLDDocument(source: LocalSource, document: string): Promise<void> {
	return applyStreamingParser(source, document, new JsonLdParser());
}

/**
 * @returns randomly generated ID for sources
 */
export function generateId() {
	return uuid();
}

/**
 * Function for setting up all the common functionality around source store API (everything but the "add"
 * functionality, which is the one part that changes depending on whether you're adding a remote
 * or local store)
 *
 * @param store <Writable> - the svelte store to decorate.
 * @returns
 */
export function decorateSourceStore<T extends Source>(store: Writable<T[]>) {
	const { set, update, subscribe } = store;

	return {
		removeAll: () => set([]),
		toggleAll: (enabled: boolean) => update((sources) => sources.map((s) => ({ ...s, enabled }))),
		updateSource: (source: T) => {
			update((sources) => [...sources.filter((s) => s.id !== source.id), source]);
		},
		removeSource: (id: string) => {
			update((sources) => sources.filter((s) => s.id != id));
		},
		toggleEnabled: (id: string) => {
			update((sources) => {
				const source = sources.find((s) => s.id === id);
				if (source) source.enabled = !source.enabled;
				return [...sources];
			});
		},
		subscribe
	};
}
