/* (c) Crown Copyright GCHQ */

import exampleQueries from './exampleQueries';

describe('Sparql example queries', () => {
	it('import correctly', () => {
		expect(exampleQueries).toMatchSnapshot();
	});
});
