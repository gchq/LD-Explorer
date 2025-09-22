/* (c) Crown Copyright GCHQ */

import { QueryEngine } from '@comunica/query-sparql/lib/index-browser';
import { createEngine } from './engine';

describe('Comunica engine', () => {
	it('exports a comunica query engine', async () => {
		expect(await createEngine()).toBeInstanceOf(QueryEngine);
	});
});
