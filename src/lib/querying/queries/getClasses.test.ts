/* (c) Crown Copyright GCHQ */

import getClasses from './getClasses';

describe('sparql queries', () => {
	describe(getClasses.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getClasses.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?className
					WHERE {
					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . } 
					      UNION
					      { ?className a rdfs:Class . }
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
					      { ?individual a ?className . }
					      UNION
					      { ?className a owl:Class . } 
					      UNION
					      { ?className a rdfs:Class . }
					}
					LIMIT 123"
				`);
			});
		});
	});
});
