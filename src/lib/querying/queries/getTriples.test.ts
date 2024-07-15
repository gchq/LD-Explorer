/* (c) Crown Copyright GCHQ */

import getTriples from './getTriples';

describe('sparql queries', () => {
	describe(getTriples.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getTriples.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT WHERE { ?s ?p ?o }
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getTriples.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"
					CONSTRUCT WHERE { ?s ?p ?o }
					LIMIT 123"
				`);
			});
		});
	});
});
