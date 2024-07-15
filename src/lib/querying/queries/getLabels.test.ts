/* (c) Crown Copyright GCHQ */

import getLabels from './getLabels';

describe('sparql queries', () => {
	describe(getLabels.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and an @en language tag', () => {
				const query = getLabels.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?resource ?label
					WHERE {
					      ?resource rdfs:label ?label
					      FILTER (LANGMATCHES(LANG(?label), "en"))
					} 
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getLabels.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?resource ?label
					WHERE {
					      ?resource rdfs:label ?label
					      FILTER (LANGMATCHES(LANG(?label), "en"))
					} 
					LIMIT 123"
				`);
			});
		});

		describe('when given a different language tag', () => {
			it('applies ths to the query', () => {
				const query = getLabels.createQuery(100, 'fr');
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?resource ?label
					WHERE {
					      ?resource rdfs:label ?label
					      FILTER (LANGMATCHES(LANG(?label), "fr"))
					} 
					LIMIT 100"
				`);
			});
		});
	});
});
