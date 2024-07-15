/* (c) Crown Copyright GCHQ */

import { sourceList, sources } from './sources.store';
import type { LocalSource } from './local-sources.store';
import type { RemoteSource } from './remote-sources.store';
import { get } from 'svelte/store';
import { sources as localSources } from './local-sources.store';
import { sources as remoteSources } from './remote-sources.store';

const localSource: LocalSource = {
	id: '',
	type: 'LOCAL',
	n3Store: undefined,
	name: 'Test local source',
	description: 'Test sorce description',
	enabled: true
};

const remoteSource: RemoteSource = {
	id: '',
	type: 'REMOTE',
	name: 'Test remote source',
	url: 'http://www.example.com/',
	description: 'Test sorce description',
	enabled: false
};

describe('Sources store', () => {
	beforeEach(() => {
		localSources.addSource(localSource);
		remoteSources.addSource(remoteSource);
	});

	afterEach(() => {
		localSources.removeAll();
		remoteSources.removeAll();
	});

	describe('sources', () => {
		it('Gives you a combined list of ALL local and remote sources', () => {
			expect(get(sources)).toHaveLength(2);
		});
	});
	describe('sourceList', () => {
		it('Gives you a combined list of ENABLED local and remote sources', () => {
			expect(get(sourceList)).toHaveLength(1);
		});
	});
});
