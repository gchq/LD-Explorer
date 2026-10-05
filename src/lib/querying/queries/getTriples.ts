/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getTriples
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return triples from the default graph, optionally also including named graphs.
 *
 */

export default { createQuery: getTriples, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getTriples(limit = 100, queryForNamedGraphs = false): string {
	return `
CONSTRUCT { ?s ?p ?o }
WHERE {
      { ?s ?p ?o }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?s ?p ?o } }` : ''}
}
LIMIT ${limit}`;
}
