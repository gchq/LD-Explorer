/* (c) Crown Copyright GCHQ */

import describeResource from './describeResource';

describe('sparql queries', () => {
	describe(describeResource.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql without GRAPH', () => {
				const query = describeResource.createQuery('http://www.example.com/foobar');
				expect(query).toMatchInlineSnapshot(`
					"CONSTRUCT { <http://www.example.com/foobar> ?p ?o }
					WHERE {
					      { <http://www.example.com/foobar> ?p ?o }

					}"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = describeResource.createQuery('http://www.example.com/foobar', true);
				expect(query).toMatchInlineSnapshot(`
					"CONSTRUCT { <http://www.example.com/foobar> ?p ?o }
					WHERE {
					      { <http://www.example.com/foobar> ?p ?o }
					      UNION
					      { GRAPH ?g { <http://www.example.com/foobar> ?p ?o } }
					}"
				`);
			});
		});
	});
});
