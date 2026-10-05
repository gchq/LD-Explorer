/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getDomains
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return domains, optionally also searching named graphs.
 *
 */

export default { createQuery: getDomains, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getDomains(limit = 100, queryForNamedGraphs = false): string {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?property ?domain
WHERE {
      { ?property rdfs:domain ?domain . }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?property rdfs:domain ?domain . } }` : ''}
}
LIMIT ${limit}`;
}
