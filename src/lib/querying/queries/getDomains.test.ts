/* (c) Crown Copyright GCHQ */

import getDomains from './getDomains';

describe('sparql queries', () => {
	describe(getDomains.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getDomains.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?domain
					WHERE {
					      { ?property rdfs:domain ?domain . }

					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getDomains.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?domain
					WHERE {
					      { ?property rdfs:domain ?domain . }

					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getDomains.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?domain
					WHERE {
					      { ?property rdfs:domain ?domain . }
					      UNION
					      { GRAPH ?g { ?property rdfs:domain ?domain . } }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
