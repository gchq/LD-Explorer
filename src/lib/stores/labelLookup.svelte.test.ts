/* (c) Crown Copyright GCHQ */

/*
import { type StreamedQuery, createQueryStore } from './streamedQuery.store';
import { sourceList, sources } from '$lib/stores/sources/local-sources.store';
import type { Bindings } from '@comunica/types';
import type { MockInstance } from 'vitest';
import type { Quad } from 'n3';
import { QueryStatus } from '$lib/types';
import { importRdfDocument } from '$lib/util/source.util';
import { logger } from '$stores/logger.store';
*/
import { sources } from '$lib/stores/sources/local-sources.store';
import { labelFor, flushLookup } from './labelLookup.svelte';
import { importRdfDocument } from '$lib/util/source.util';
import { get } from 'svelte/store';
import { waitFor } from '@testing-library/svelte';

const document = `
@prefix ex: <http://example.org/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:team1 a ex:SportsTeam .
ex:team2 a ex:SportsTeam .
ex:team1 rdfs:label "Unit Testing United FC" .
`;

describe(labelFor, () => {
	beforeEach(() => {
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

	afterEach(() => {
		flushLookup();
	});

	it('echoes back the same IRI if no label found', async () => {
		expect(await labelFor('http://example.org/team2')).toEqual('http://example.org/team2');
	});

	it('provides default value if given', async () => {
		expect(await labelFor('http://example.org/team2', { defaultValue: 'Flobalob' })).toEqual(
			'Flobalob'
		);
	});

	it('lazily finds the label if it exists in the data source', async () => {
		// As this function defaults to lazy, it won't find the label straight away.
		expect(await labelFor('http://example.org/team1')).toEqual('http://example.org/team1');

		// if we wait a little while though, it will eventually return the right label. This lazy functionality is
		// the default by design: The lookup is inside a $state rune, so Svelte's reactivity
		// will sort out updating the tempaltes once a label has been found.
		await waitFor(async () =>
			expect(await labelFor('http://example.org/team1')).toEqual('Unit Testing United FC')
		);
	});

	it('eagerly finds the label when requested', async () => {
		expect(await labelFor('http://example.org/team1', { lazy: false })).toEqual(
			'Unit Testing United FC'
		);
	});
});
