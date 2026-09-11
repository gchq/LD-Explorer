/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getTriples
 * @param {number} limit
 * @returns {string}
 *
 * Return triples from default and named graphs
 *
 */

export default { createQuery: getTriples, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getTriples(limit = 100): string {
	return `
CONSTRUCT { ?s ?p ?o }
WHERE {
      { ?s ?p ?o }
      UNION
      { GRAPH ?ldExplorerGraph { ?s ?p ?o } }
}
LIMIT ${limit}`;
}
