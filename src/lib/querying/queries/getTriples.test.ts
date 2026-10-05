/* (c) Crown Copyright GCHQ */

import getTriples from './getTriples';

describe('sparql queries', () => {
	describe(getTriples.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getTriples.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT { ?s ?p ?o }
					WHERE {
					      { ?s ?p ?o }

					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getTriples.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT { ?s ?p ?o }
					WHERE {
					      { ?s ?p ?o }

					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getTriples.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT { ?s ?p ?o }
					WHERE {
					      { ?s ?p ?o }
					      UNION
					      { GRAPH ?g { ?s ?p ?o } }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
