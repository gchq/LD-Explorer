/* (c) Crown Copyright GCHQ */

import getProperties from './getProperties';

describe('sparql queries', () => {
	describe(getProperties.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getProperties.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX owl: <http://www.w3.org/2002/07/owl#>
					PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

					SELECT DISTINCT ?propertyName
					WHERE {
					      {
					            { ?s ?propertyName ?o }
					            UNION
					            { ?propertyName a owl:ObjectProperty . }
					            UNION
					            { ?propertyName a owl:DatatypeProperty . }
					            UNION
					            { ?propertyName a rdf:Property . }}
					      
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getProperties.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX owl: <http://www.w3.org/2002/07/owl#>
					PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

					SELECT DISTINCT ?propertyName
					WHERE {
					      {
					            { ?s ?propertyName ?o }
					            UNION
					            { ?propertyName a owl:ObjectProperty . }
					            UNION
					            { ?propertyName a owl:DatatypeProperty . }
					            UNION
					            { ?propertyName a rdf:Property . }}
					      
					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getProperties.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					PREFIX owl: <http://www.w3.org/2002/07/owl#>
					PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

					SELECT DISTINCT ?propertyName
					WHERE {
					      {
					            { ?s ?propertyName ?o }
					            UNION
					            { ?propertyName a owl:ObjectProperty . }
					            UNION
					            { ?propertyName a owl:DatatypeProperty . }
					            UNION
					            { ?propertyName a rdf:Property . }}
					      UNION
					      {
					            GRAPH ?g {
					                  
					            { ?s ?propertyName ?o }
					            UNION
					            { ?propertyName a owl:ObjectProperty . }
					            UNION
					            { ?propertyName a owl:DatatypeProperty . }
					            UNION
					            { ?propertyName a rdf:Property . }
					            }
					      }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
