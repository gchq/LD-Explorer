/* (c) Crown Copyright GCHQ */

import getAppearances from './getAppearances';

const iri = 'http://www.example.com/foobar';

describe('sparql queries', () => {
	describe(getAppearances.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getAppearances.createQuery(iri);
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT {
					      <http://www.example.com/foobar> ?p0 ?o0 .
					      ?s1 <http://www.example.com/foobar> ?o1 .
					      ?s2 ?p2 <http://www.example.com/foobar> .
					}
					WHERE {
					      { <http://www.example.com/foobar> ?p0 ?o0 }
					UNION
					      { ?s1 <http://www.example.com/foobar> ?o1 }
					UNION
					      { ?s2 ?p2 <http://www.example.com/foobar> }
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a different limit', () => {
			it('applies this to the query', () => {
				const query = getAppearances.createQuery(iri, 123);
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT {
					      <http://www.example.com/foobar> ?p0 ?o0 .
					      ?s1 <http://www.example.com/foobar> ?o1 .
					      ?s2 ?p2 <http://www.example.com/foobar> .
					}
					WHERE {
					      { <http://www.example.com/foobar> ?p0 ?o0 }
					UNION
					      { ?s1 <http://www.example.com/foobar> ?o1 }
					UNION
					      { ?s2 ?p2 <http://www.example.com/foobar> }
					}
					LIMIT 123"
				`);
			});
		});
	});
});
