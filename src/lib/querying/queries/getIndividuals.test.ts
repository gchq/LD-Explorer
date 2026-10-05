/* (c) Crown Copyright GCHQ */

import getIndividuals from './getIndividuals';

describe('sparql queries', () => {
	describe(getIndividuals.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100 and no GRAPH clause', () => {
				const query = getIndividuals.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?individual ?className
					WHERE {
					      { ?individual a ?className }
					      
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getIndividuals.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?individual ?className
					WHERE {
					      { ?individual a ?className }
					      
					}
					LIMIT 123"
				`);
			});
		});

		describe('when querying for named graphs', () => {
			it('includes the GRAPH clause', () => {
				const query = getIndividuals.createQuery(100, true);
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?individual ?className
					WHERE {
					      { ?individual a ?className }
					      UNION
					      { GRAPH ?g { ?individual a ?className } }
					}
					LIMIT 100"
				`);
			});
		});
	});
});
