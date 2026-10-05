/* (c) Crown Copyright GCHQ */

import getClasses from './getClasses';

describe('sparql queries', () => {
	describe(getClasses.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getClasses.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?className
					WHERE {
					      {
					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . }
					      UNION
					      { ?className a rdfs:Class . }}

					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a different limit', () => {
			it('applies this to the query', () => {
				const query = getClasses.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?className
					WHERE {
					      {
					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . }
					      UNION
					      { ?className a rdfs:Class . }}

					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getClasses.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?className
					WHERE {
					      {
					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . }
					      UNION
					      { ?className a rdfs:Class . }}
					      UNION
					      {
					            GRAPH ?g {

					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . }
					      UNION
					      { ?className a rdfs:Class . }
					            }
					      }

					}
					LIMIT 100"
				`);
			});
		});
	});
});
