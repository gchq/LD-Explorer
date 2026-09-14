/* (c) Crown Copyright GCHQ */

import describeResource from './describeResource';

describe('sparql queries', () => {
	describe(describeResource.createQuery, () => {
		it('produces the expected sparql', () => {
			const query = describeResource.createQuery('http://www.example.com/foobar');
			expect(query).toMatchInlineSnapshot(`
				"CONSTRUCT { <http://www.example.com/foobar> ?p ?o }
				WHERE {
				      { <http://www.example.com/foobar> ?p ?o }
				      UNION
				      { GRAPH ?ldExplorerGraph { <http://www.example.com/foobar> ?p ?o } }
				}"
			`);
		});
	});
});
