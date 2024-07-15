/* (c) Crown Copyright GCHQ */

import getSuperclasses from './getSuperclasses';

describe('sparql queries', () => {
	describe(getSuperclasses.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getSuperclasses.createQuery('http://www.example.com/');
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?superClass 
					WHERE {
					    <http://www.example.com/> rdfs:subClassOf* ?superClass .
					    ?subClass rdfs:subClassOf ?superClass .
					    FILTER (?superClass != <http://www.example.com/>)
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getSuperclasses.createQuery('http://www.example.com/', 123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?superClass 
					WHERE {
					    <http://www.example.com/> rdfs:subClassOf* ?superClass .
					    ?subClass rdfs:subClassOf ?superClass .
					    FILTER (?superClass != <http://www.example.com/>)
					}
					LIMIT 123"
				`);
			});
		});
	});
});
