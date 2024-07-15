/* (c) Crown Copyright GCHQ */

import { QueryEngine } from '@comunica/query-sparql/lib/index-browser';
import { engine } from './engine';

describe('Comunica engine', () => {
	it('exports a comunica query engine', () => {
		expect(engine).toBeInstanceOf(QueryEngine);
	});
});
