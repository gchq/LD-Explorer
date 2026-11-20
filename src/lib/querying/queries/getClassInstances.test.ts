/* (c) Crown Copyright GCHQ */

import getClassInstances from './getClassInstances';

describe('sparql queries', () => {
	describe(getClassInstances.createQuery, () => {
		describe('when given only an IRI', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getClassInstances.createQuery('http://www.example.com/');
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?instance
					WHERE {
					      { ?instance a <http://www.example.com/> . }
					      
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getClassInstances.createQuery('http://www.example.com/', 123);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?instance
					WHERE {
					      { ?instance a <http://www.example.com/> . }
					      
					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getClassInstances.createQuery('http://www.example.com/', 100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?instance
					WHERE {
					      { ?instance a <http://www.example.com/> . }
					      UNION
					      { GRAPH ?g { ?instance a <http://www.example.com/> . } }
					}
					LIMIT 100"
				`);
			});
		});

		describe('when includeSubclasses is true', () => {
			it('uses the rdfs:subClassOf* path form with no GRAPH clause', () => {
				const query = getClassInstances.createQuery('http://www.example.com/', 100, false, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?instance
					WHERE {
					      {
					          ?instance a ?type .
					          ?type rdfs:subClassOf* <http://www.example.com/> .
					      }
					      
					}
					LIMIT 100"
				`);
			});

			it('applies a custom limit', () => {
				const query = getClassInstances.createQuery('http://www.example.com/', 50, false, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?instance
					WHERE {
					      {
					          ?instance a ?type .
					          ?type rdfs:subClassOf* <http://www.example.com/> .
					      }
					      
					}
					LIMIT 50"
				`);
			});

			it('includes a single GRAPH clause wrapping the full pattern when querying named graphs', () => {
				const query = getClassInstances.createQuery('http://www.example.com/', 100, true, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

					SELECT DISTINCT ?instance
					WHERE {
					      {
					          ?instance a ?type .
					          ?type rdfs:subClassOf* <http://www.example.com/> .
					      }
					      UNION
					      {
					          GRAPH ?g {
					              ?instance a ?type .
					              ?type rdfs:subClassOf* <http://www.example.com/> .
					          }
					      }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
