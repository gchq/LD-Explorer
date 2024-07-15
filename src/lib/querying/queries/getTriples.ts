/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getTriples
 * @param {number} limit
 * @returns {string}
 *
 * Return triples from default graph
 *
 */

export default { createQuery: getTriples, codeComment: CommonCodeComments.ChangeLimitInSettings };

function getTriples(limit = 100): string {
	return `
CONSTRUCT WHERE { ?s ?p ?o }
LIMIT ${limit}`;
}
