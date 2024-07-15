/* (c) Crown Copyright GCHQ */

import getIndividuals from './getIndividuals';

describe('sparql queries', () => {
	describe(getIndividuals.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getIndividuals.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?individual ?className
					WHERE {
					      ?individual a ?className
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
					      ?individual a ?className
					} 
					LIMIT 123"
				`);
			});
		});
	});
});
