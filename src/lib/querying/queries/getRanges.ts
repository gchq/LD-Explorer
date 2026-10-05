/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getRanges
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return ranges, optionally also searching named graphs.
 *
 */

export default { createQuery: getRanges, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getRanges(limit = 100, queryForNamedGraphs = false): string {
	return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?property ?range
WHERE {
      { ?property rdfs:range ?range . }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?property rdfs:range ?range . } }` : ''}
}
LIMIT ${limit}`;
}
