/* (c) Crown Copyright GCHQ */

import getClassInstances from './getClassInstances';

describe('sparql queries', () => {
	describe(getClassInstances.createQuery, () => {
		describe('when given only an IRI', () => {
			it('produces the expected sparql with a limit of 100', () => {
				const query = getClassInstances.createQuery('http://www.example.com/');
				expect(query).toMatchInlineSnapshot(`
					"
					SELECT DISTINCT ?instance
					WHERE {
					      ?instance a <http://www.example.com/> .
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
					      ?instance a <http://www.example.com/> .
					}
					LIMIT 123"
				`);
			});
		});
	});
});
