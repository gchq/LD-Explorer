/* (c) Crown Copyright GCHQ */

import type { RoutedTabView } from './types';
import createTabDetail from './IRIDetailNavigation';

describe('IRIDetailNavigation', () => {
	let tabDetail: RoutedTabView<unknown>;
	const iri = 'http://www.example.com/';

	beforeEach(() => {
		tabDetail = createTabDetail(iri);
	});

	it('creates the correct config', () => {
		expect(tabDetail).toMatchSnapshot();
	});

	it('has the heading of whatever IRI is passed in', () => {
		const exampleIri = 'http://www.foobar.com/';
		expect(createTabDetail(exampleIri).heading).toEqual(exampleIri);
	});

	it('has the right type', () => {
		expect(typeof tabDetail).toBe('object');
	});
});
