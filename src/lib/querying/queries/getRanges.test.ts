/* (c) Crown Copyright GCHQ */

import getRanges from './getRanges';

describe('sparql queries', () => {
	describe(getRanges.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getRanges.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?range
					WHERE {
					      { ?property rdfs:range ?range . }
					      
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getRanges.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?range
					WHERE {
					      { ?property rdfs:range ?range . }
					      
					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getRanges.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?property ?range
					WHERE {
					      { ?property rdfs:range ?range . }
					      UNION
					      { GRAPH ?g { ?property rdfs:range ?range . } }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
