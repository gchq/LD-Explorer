/* (c) Crown Copyright GCHQ */

import getNamedGraphs from './getNamedGraphs';

describe('sparql queries', () => {
	describe(getNamedGraphs.createQuery, () => {
		describe('default behavior', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getNamedGraphs.createQuery();
				expect(query).toMatchInlineSnapshot(`
					"SELECT DISTINCT ?named_graph
					WHERE {
					    GRAPH ?named_graph { ?s ?p ?o }
					}
					LIMIT 100"
				`);
			});
		});

		describe('when given a specific limit', () => {
			it('applies this to the query', () => {
				const query = getNamedGraphs.createQuery(123);
				expect(query).toMatchInlineSnapshot(`
					"SELECT DISTINCT ?named_graph
					WHERE {
					    GRAPH ?named_graph { ?s ?p ?o }
					}
					LIMIT 123"
				`);
			});
		});
	});
});
