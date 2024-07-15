/* (c) Crown Copyright GCHQ */

import getRanges from './getRanges';

describe('sparql queries', () => {
	describe(getRanges.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getRanges.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT ?property ?range 
					WHERE { ?property rdfs:range ?range . } 
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

					SELECT ?property ?range 
					WHERE { ?property rdfs:range ?range . } 
					LIMIT 123"
				`);
			});
		});
	});
});
