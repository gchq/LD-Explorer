/* (c) Crown Copyright GCHQ */

import getSubclasses from './getSubclasses';

describe('sparql queries', () => {
	describe(getSubclasses.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getSubclasses.createQuery('http://www.example.com/');
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					CONSTRUCT { ?subClass rdfs:subClassOf ?superClass . }
					WHERE {
					    ?subClass rdfs:subClassOf* <http://www.example.com/> .
					    ?subClass rdfs:subClassOf ?superClass .
					    FILTER (?subClass != <http://www.example.com/>)
					}
					LIMIT 100
					      "
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getSubclasses.createQuery('http://www.example.com/', 123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					CONSTRUCT { ?subClass rdfs:subClassOf ?superClass . }
					WHERE {
					    ?subClass rdfs:subClassOf* <http://www.example.com/> .
					    ?subClass rdfs:subClassOf ?superClass .
					    FILTER (?subClass != <http://www.example.com/>)
					}
					LIMIT 123
					      "
				`);
			});
		});
	});
});
