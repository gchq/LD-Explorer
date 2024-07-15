/* (c) Crown Copyright GCHQ */

import { validateSparql } from './sparqlUtils';

const sparqlQuery = 'SELECT * WHERE { ?s ?p ?o } LIMIT 100';

describe('validateSparql', () => {
	describe('when given a valid sparql query', () => {
		it('does not throw an error', () => {
			expect(() => validateSparql(sparqlQuery)).not.toThrowError();
		});
	});
	describe('when given an invalid sparql query', () => {
		it('throws an error', () => {
			const query = 'I am a totally invalid sparql query';
			expect(() => validateSparql(query)).toThrowError();
		});
	});
});
