/* (c) Crown Copyright GCHQ */

import getBaseClasses from './getBaseClasses';

describe('sparql queries', () => {
	describe(getBaseClasses.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getBaseClasses.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX owl: <http://www.w3.org/2002/07/owl#>
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?class
					WHERE {
					      ?s a ?class .
					      FILTER NOT EXISTS { ?class rdfs:subClassOf ?parent . FILTER( ?parent != owl:Thing ) }
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a different limit', () => {
			it('applies this to the query', () => {
				const query = getBaseClasses.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX owl: <http://www.w3.org/2002/07/owl#>
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?class
					WHERE {
					      ?s a ?class .
					      FILTER NOT EXISTS { ?class rdfs:subClassOf ?parent . FILTER( ?parent != owl:Thing ) }
					}
					LIMIT 123"
				`);
			});
		});
	});
});
