/* (c) Crown Copyright GCHQ */

import { type RemoteSource, sources } from './remote-sources.store';
import { get } from 'svelte/store';

const exampleRemoteSource: RemoteSource = {
	id: '',
	type: 'REMOTE',
	name: 'Test source',
	url: 'http://www.example.com/',
	description: 'Test sorce description',
	enabled: true
};

describe('settings', () => {
	afterEach(() => {
		sources.removeAll();
	});

	describe(sources.addSource, () => {
		let source: RemoteSource;

		describe('base functionality', () => {
			beforeEach(() => {
				sources.addSource(exampleRemoteSource);
				source = get(sources)[0];
			});

			it('Assigns a uuid as the ID', () => {
				expect(source.id).not.toHaveLength(0);
			});

			it('Adds the correct metadata', () => {
				expect(source.name).toEqual(exampleRemoteSource.name);
				expect(source.description).toEqual(exampleRemoteSource.description);
			});

			it('Adds the correct URL', () => {
				expect(source.url).toEqual(exampleRemoteSource.url);
			});

			it('Adds the correct type', () => {
				expect(source.type).toEqual(exampleRemoteSource.type);
			});

			it('Adds the correct value for enabled', () => {
				expect(source.enabled).toEqual(exampleRemoteSource.enabled);
			});

			it('defaults to specifying that the source is not in the catalog', () => {
				expect(source.fromCatalog).toBeFalsy();
			});
		});

		it('allows you to specify that the source came from the catalog', () => {
			sources.addSource({ ...exampleRemoteSource, fromCatalog: true });
			const source = get(sources)[0];

			expect(source.fromCatalog).toEqual(true);
		});
	});

	describe(sources.updateSource, () => {
		it('allows you to update a particular source', () => {
			sources.addSource(exampleRemoteSource);
			const source = get(sources)[0];

			const updatedSource = { ...source, name: 'New name' };
			sources.updateSource(updatedSource);

			expect(get(sources)).toHaveLength(1);
			expect(get(sources)[0].name).toEqual('New name');
		});
	});

	describe(sources.removeSource, () => {
		it('allows you to remove a source', () => {
			sources.addSource(exampleRemoteSource);
			const source = get(sources)[0];

			sources.removeSource(source.id);

			expect(get(sources)).toHaveLength(0);
		});
	});

	describe(sources.toggleEnabled, () => {
		it('allows you to toggle the enabled status of a source', () => {
			sources.addSource(exampleRemoteSource);
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
			sources.addSource(exampleRemoteSource);
			sources.addSource({
				id: '',
				type: 'REMOTE',
				name: 'Second Test source',
				description: 'Second Test sorce description',
				url: 'http://www.example.com/other-example',
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
