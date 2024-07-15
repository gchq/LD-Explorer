/* (c) Crown Copyright GCHQ */

import layout from './layout';

describe('cytoscape', () => {
	describe('layout', () => {
		it('returns the layout config', () => {
			expect(layout).toMatchSnapshot();
		});
	});
});
