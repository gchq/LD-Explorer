/* (c) Crown Copyright GCHQ */

import describeResource from './describeResource';

describe('sparql queries', () => {
	describe(describeResource.createQuery, () => {
		it('produces the expected sparql', () => {
			const query = describeResource.createQuery('http://www.example.com/foobar');
			expect(query).toMatchInlineSnapshot('"DESCRIBE <http://www.example.com/foobar>"');
		});
	});
});
