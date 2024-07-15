/* (c) Crown Copyright GCHQ */

import { Parser as SparqlParser, type SparqlQuery } from 'sparqljs';

/**
 * Takes a string, returns a parsed object. We never use this function outside of this file,
 * it's currently just being used to facilitate whether or not a particular sparql query is
 * valid.
 *
 * @param {string} sparqlQuery
 * @returns SparqlQuery (sparqljs instance)
 */
function parseSparql(sparqlQuery: string): SparqlQuery {
	const parser = new SparqlParser();
	return parser.parse(sparqlQuery);
}

/**
 *
 * @param {string} sparqlQuery
 */
export function validateSparql(sparqlQuery: string) {
	// Really, this is just a proxy to the above "parse" function, although in future we might
	// be able to make some additional savings here so good to seperate out the intention into
	// its own function.
	parseSparql(sparqlQuery);
}

export enum CommonCodeComments {
	ChangeLimitInSettings = 'The LIMIT on this query can be changed in the settings.'
}
