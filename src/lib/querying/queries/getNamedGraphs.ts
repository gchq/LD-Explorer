/* (c) Crown Copyright GCHQ */

import { CommonCodeComments } from '../sparqlUtils';

/**
 * getIndividuals
 * @param {number?} limit
 * @returns {string}
 *
 * Return the IRI for any named graphs.
 *
 */

export default {
	createQuery: getNamedGraphs,
	codeComment: CommonCodeComments.ChangeLimitInSettings
};

function getNamedGraphs(limit = 100): string {
	return `SELECT DISTINCT ?named_graph
WHERE {
    GRAPH ?named_graph { ?s ?p ?o }
}
LIMIT ${limit}`;
}
