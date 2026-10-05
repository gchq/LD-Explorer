/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getIndividuals
 * @param {number} limit
 * @param {boolean} queryForNamedGraphs
 * @returns {string}
 *
 * Return any individuals (instances of a class) and their associated class,
 * optionally also searching named graphs.
 *
 */

export default {
	createQuery: getIndividuals,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getIndividuals(limit = 100, queryForNamedGraphs = false): string {
	return `
SELECT DISTINCT ?individual ?className
WHERE {
      { ?individual a ?className }
      ${queryForNamedGraphs ? `UNION\n      { GRAPH ?g { ?individual a ?className } }` : ''}
}
LIMIT ${limit}`;
}
