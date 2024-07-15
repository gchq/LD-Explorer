/* (c) Crown Copyright GCHQ */

import { type LocalSource, sources } from './local-sources.store';
import { Store as N3Store } from 'n3';
import { get } from 'svelte/store';

const exampleLocalSource: LocalSource = {
	id: '',
	type: 'LOCAL',
	n3Store: undefined,
	name: 'Test source',
	description: 'Test sorce description',
	enabled: true
};

describe('settings', () => {
	afterEach(() => {
		sources.removeAll();
	});

	describe(sources.addSource, () => {
		let source: LocalSource;

		beforeEach(() => {
			sources.addSource(exampleLocalSource);
			source = get(sources)[0];
		});

		it('Assigns a uuid as the ID', () => {
			expect(source.id).not.toHaveLength(0);
		});

		it('Adds the correct metadata', () => {
			expect(source.name).toEqual(exampleLocalSource.name);
			expect(source.description).toEqual(exampleLocalSource.description);
		});

		it('Adds the correct type', () => {
			expect(source.type).toEqual(exampleLocalSource.type);
		});

		it('Adds the correct value for enabled', () => {
			expect(source.enabled).toEqual(exampleLocalSource.enabled);
		});

		it('creates an n3 store for the source', () => {
			expect(source.n3Store).toBeInstanceOf(N3Store);
		});
	});

	describe(sources.updateSource, () => {
		it('allows you to update a particular source', () => {
			sources.addSource(exampleLocalSource);
			const source = get(sources)[0];

			const updatedSource = { ...source, name: 'New name' };
			sources.updateSource(updatedSource);

			expect(get(sources)).toHaveLength(1);
			expect(get(sources)[0].name).toEqual('New name');
		});
	});

	describe(sources.removeSource, () => {
		it('allows you to remove a source', () => {
			sources.addSource(exampleLocalSource);
			const source = get(sources)[0];

			sources.removeSource(source.id);

			expect(get(sources)).toHaveLength(0);
		});
	});

	describe(sources.toggleEnabled, () => {
		it('allows you to toggle the enabled status of a source', () => {
			sources.addSource(exampleLocalSource);
			const source = get(sources)[0];

			sources.toggleEnabled(source.id);

			expect(get(sources)).toHaveLength(1);
			expect(get(sources)[0].enabled).toEqual(false);

			sources.toggleEnabled(source.id);

			expect(get(sources)).toHaveLength(1);
			expect(get(sources)[0].enabled).toEqual(true);
		});
	});

	describe(sources.toggleAll, () => {
		it('allows you to toggle the enabled status of all sources', () => {
			sources.addSource(exampleLocalSource);
			sources.addSource({
				id: '',
				type: 'LOCAL',
				n3Store: undefined,
				name: 'Second Test source',
				description: 'Second Test sorce description',
				enabled: false
			});

			sources.toggleAll(true);
			expect(get(sources)[0].enabled).toEqual(true);
			expect(get(sources)[1].enabled).toEqual(true);

			sources.toggleAll(false);
			expect(get(sources)[0].enabled).toEqual(false);
			expect(get(sources)[1].enabled).toEqual(false);

			expect(get(sources)).toHaveLength(2);
		});
	});
});
