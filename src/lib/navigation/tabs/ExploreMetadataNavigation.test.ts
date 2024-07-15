/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';
import createTabDetail from './ExploreMetadataNavigation';

describe('ExploreMetadataNavigation', () => {
	let tabDetail: RoutedTabView<unknown>;

	beforeEach(() => {
		tabDetail = createTabDetail();
	});

	it('creates the correct config', () => {
		expect(tabDetail).toMatchSnapshot();
	});

	it('has the right type', () => {
		expect(typeof tabDetail).toBe('object');
	});
});
